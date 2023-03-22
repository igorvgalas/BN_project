from django.contrib import admin
from .models import Customer, Service,ServiceCategory, Staff,Appointment,AppointmentItem, PaymentMethod, Avability

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id','user_id','phone_number', 'birth_date', 'membership')
    search_fields = ('phone_number', 'birth_date')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price','category')
    list_filter = ('category', )


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_filter = ('title', )

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age')
    list_editable = ('name', 'age')

class AppointmentItemInline(admin.TabularInline):
    autocomplete_fields = ['service']
    min_num = 1
    max_num = 10
    model = AppointmentItem
    extra = 0

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id','customer','placed_at','payment', 'payment_method')
    search_fields = ('customer','placed_at','payment_method')
    list_filter = ('placed_at',)

@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')

@admin.register(Avability)
class AvabilityAdmin(admin.ModelAdmin):
    list_display = ('staff', 'slot_time', 'date')
    search_fields = ('date',)
