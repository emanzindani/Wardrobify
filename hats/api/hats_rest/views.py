from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Hat, LocationVO

from django.views.decorators.http import require_http_methods
import json
from .acls import get_photo

#ENCODERS--------------------------------------------------------------------------------------------

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
    ]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "created",
        "url_picture",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


#VIEWS--------------------------------------------------------------------------------------------


@require_http_methods(["GET", "POST"])
def list_hats(request, location_vo_id=None):
    """
    Lists the hat fabrics and the link to the hat
    for the specified location id.

    Returns a dictionary with a single key "hats" which
    is a list of hat fabrics and URLS. Each entry in the list
    is a dictionary that contains the fabric of the hat and
    the link to the hats's information.

    {
        "hats": [
            {
                "fabric": hat's fabric,
                "href": URL to the hat,
            },
            ...
        ]
    }
    """
    if request.method == "GET":

        hats = Hat.objects.filter(location=location_vo_id)

        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else: #POST
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
        try:
            location_href = f"/api/locations/{location_vo_id}/"
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        # Use the fabric, style name, color in the content dictionary to call the get_photo ACL function
        # Use the returned dictionary to update the content dictionary
        content["picture_url"] = get_photo(content["fabric"], content["style_name"], content["color"]) #adds a new pair in the content dictionary


        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def show_hat(request, id):
    """
    Returns the details for the Hat model specified
    by the id parameter.

    This should return a dictionary with fabric, style name,
    color, url picture, created, and location properties for
    the specified Hat instance.

    {
        "fabric": the hat's fabric,
        "style_name": the hat's style name,
        "color": the hat's color's name,
        "url_picture": the hat's url's picture,
        "created": the date/time when the record was created,
        "location": {
            "closet_name": the name of the location,
            "href": the URL to the location,
        }
    }
    """
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )  # returns {"deleted": true} if successfully deleted, {"deleted": true} otherwise (like there is nothing to delete)
    else: # PUT
        content = json.loads(request.body)

        # Get the Location object and put it in the content dict
        try:
            if "location" in content:
                location = LocationVO.objects.get(id=content["location"])
                content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        location = Hat.objects.filter(id=id).update(
            **content
        )  # **content argument to unwrap the dictionary

        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
