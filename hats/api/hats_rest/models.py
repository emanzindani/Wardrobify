from django.db import models
from django.urls import reverse

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)


class Hat(models.Model):
    """
    The Hat model represents a hat that is at a specific location
    """

    fabric = models.CharField(max_length=200, null=True, blank=True)
    style_name = models.CharField(max_length=200, null=True, blank=True)
    color = models.CharField(max_length=200, null=True, blank=True)
    url_picture = models.URLField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)

    location = models.ForeignKey(
        "LocationVO",
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.style_name

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"id": self.id})
