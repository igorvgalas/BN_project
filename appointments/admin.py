from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'time', 'client_name',
                    'phone_number', 'master', 'service')
    list_filter = ('master', 'date')
    search_fields = ('master', 'date')
