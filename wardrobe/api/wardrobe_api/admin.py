from django.contrib import admin

from .models import Bin, Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass
