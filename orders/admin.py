from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'appointment_date', 'service_name', 'pay_amount',
                    'pay_method', 'client')
    search_fields = ('appointment_date', 'client')
