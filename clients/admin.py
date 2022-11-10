from django.contrib import admin
from .models import Client


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'client_name', 'phone_number')
    search_fields = ('phone_number', )
