from django.contrib import admin

from .models import Hat


@admin.register(Hat)
class LocationAdmin(admin.ModelAdmin):
    pass
