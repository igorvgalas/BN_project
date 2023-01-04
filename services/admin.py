from django.contrib import admin
from .models import Service, ServiceCategory


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'serv_name', 'service_category')
    list_filter = ('service_category', )


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name')
    list_filter = ('category_name', )
