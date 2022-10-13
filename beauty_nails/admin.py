from collections import _OrderedDictKeysView
from django.contrib import admin
from .models import Service, Master, Client, Order


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    list_filter = ('name', )


@admin.register(Master)
class MasterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'experience', 'age')


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone_number')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'time', 'client_id',
                    'master_id', 'service_id')


#admin.site.register(Service, ServiceAdmin)
#admin.site.register(Master, MasterAdmin)
#admin.site.register(Client, ClientAdmin)
#admin.site.register(Order, OrderAdmin)
