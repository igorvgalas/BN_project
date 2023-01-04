from django.contrib import admin
from .models import Order, Order_client


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'appointment_date', 'service_name', 'pay_amount',
                    'pay_method', 'client')
    search_fields = ('appointment_date', 'client')
    list_filter = ('appointment_date',)


@admin.register(Order_client)
class OrderClientAdmin(admin.ModelAdmin):
    empty_value_display = '-не вибрано-'
    list_display = ('id', 'appointment_date', 'appointment_time',
                    'service_name', 'client_name', 'phone_number', 'master')
    search_fields = ('appointment_date', 'client_name', 'master')
    list_filter = ('appointment_date', 'master')
