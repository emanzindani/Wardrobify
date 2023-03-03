from .keys import PEXELS_API_KEY
import requests


def get_photo(fabric, style_name, color):
    # Create a dictionary for the headers to use in the request:
    headers = {"Authorization": PEXELS_API_KEY}
    # Create the URL for the request with the fabric, style name and color:
    url = "https://api.pexels.com/v1/search"
    parameters = {
        "query": f"{fabric} {style_name} {color}",
        "per_page": 1,
    }
    # Make the request:
    response = requests.get(url, params=parameters, headers=headers)
    try:
        # Parse the JSON response,
        # Return a dictionary that contains a `picture_url` key and
        #   one of the URLs for one of the pictures in the response:
        photo_hat_url = response.json()["photos"][0]["src"]["original"]
        return photo_hat_url
    except (KeyError, IndexError):
        return None
