from django.contrib import admin
from .models import Qrcode


@admin.register(Qrcode)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'data',
        'device',
        'pub_date'
    )
