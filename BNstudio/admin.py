from django.db.models.aggregates import Count
from django.utils.html import urlencode, format_html
from django.contrib import admin
from django.urls import reverse
from . import models




    
@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user']
    list_display = ['first_name', 'last_name','phone_number', 'birth_date', 'membership', 'appointments', 'thumbnail']
    list_editable = ['membership']
    list_per_page = 10
    list_select_related = ['user']
    search_fields = ['user__first_name__istartswith', 'user__last_name__istartswith']
    
    @admin.display(description='Photo')
    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
        return ''
    
    @admin.display(ordering='appointments_count')
    def appointments(self, customer):
        url = (
            reverse('admin:BNstudio_appointment_changelist')
            + '?'
            + urlencode({
                'customer__id': str(customer.id)
            }))
        return format_html('<a href="{}">{} Appointments</a>', url, customer.appointments_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            appointments_count=Count('appointment'))

    class Media:
        css = {
            'all': ['BNstudio/styles.css']
        }   


@admin.register(models.Service)
class ServiceAdmin(admin.ModelAdmin):
    autocomplete_fields = ['category']
    prepopulated_fields = {
       'slug': ['title']
    }
    list_display = ['id', 'title', 'price','category','last_update', 'make_time']
    list_filter = ['category', 'last_update']
    list_editable = ['price', 'make_time']
    search_fields = ['title', 'category__istartswith']



@admin.register(models.ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'service_count', 'image']
    list_filter = ['title']
    search_fields = ['title']
    
    @admin.display(ordering='services_count')
    def service_count(self, category):
        url = (
            reverse('admin:BNstudio_service_changelist')
            + '?'
            + urlencode({
                'category__id': str(category.id)
            }))
        return format_html('<a href="{}">{} Services</a>', url, category.services_count)

    
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(services_count=Count('service'))

@admin.register(models.Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'age']
    list_editable = ['name', 'age']
    search_fields = ['name']

class AppointmentItemInline(admin.TabularInline):
    model = models.AppointmentItem
    autocomplete_fields = ['service', 'appointment']
    extra = 1


@admin.register(models.Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    autocomplete_fields = ['customer', 'payment_method']
    inlines = [AppointmentItemInline]
    list_display = ['id','customer','placed_at','payment', 'payment_method', 'total_price', 'membership','staff','date', 'time_slot']
    search_fields = ['customer','placed_at','payment_method', 'date', 'staff']
    list_filter = ['placed_at', 'staff', 'date']
    

    @admin.display(ordering='customer__membership')
    def membership(self, appointment):
        if appointment.customer:
            return appointment.customer.membership
        else:
            return "N/A"
    

@admin.register(models.AppointmentItem)
class AppointmentItemAdmin(admin.ModelAdmin):
    autocomplete_fields = ['service', 'appointment']
    list_display = ['appointment', 'service', 'price']


@admin.register(models.PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    search_fields = ['title']

@admin.register(models.Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ['id','staff', 'date']
    search_fields = ['date', 'staff']
    list_filter = ['date', 'staff']
