import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
from hats_rest.models import LocationVO

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            url = 'http://wardrobe-api:8000/api/locations/'

            response = requests.get(url)
            print(response)
            content = json.loads(response.content)

            print(content)
            print("GOT A CONTENT!!!")

            for location in content["locations"]:
                LocationVO.objects.update_or_create(
                    import_href=location["href"],
                    defaults={"closet_name": location["closet_name"]},
                )

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
