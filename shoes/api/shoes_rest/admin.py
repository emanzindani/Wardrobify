from django.contrib import admin
from .models import Shoe

# Register your models here.
@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    pass
