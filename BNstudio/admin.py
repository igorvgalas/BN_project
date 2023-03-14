from django.contrib import admin
from .models import Customer, Service,ServiceCategory, Staff,Appointment, Payment, PaymentMethod, Status, Avability

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name','phone_number')
    search_fields = ('phone_number', )

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price','category')
    list_filter = ('category', )


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_filter = ('name', )

@admin.register(Staff)
class MasterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age')
    list_editable = ('name', 'age')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id','date','start_time', 'end_time','customer', 'service','staff','status')
    search_fields = ('staff', 'client', 'service')
    list_filter = ('staff',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id','appointment', 'amount', 'payment_method')
    search_fields = ('payment_method',)

@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )    

@admin.register(Avability)
class AvabilityAdmin(admin.ModelAdmin):
    list_display = ('staff', 'start_time', 'end_time', 'date')
    search_fields = ('date',)
