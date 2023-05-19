from django_filters.rest_framework import FilterSet, DateFilter, DateFromToRangeFilter
from .models import Service, Customer, Availability, Appointment

class ServiceFilter(FilterSet):
  class Meta:
    model = Service
    fields = {
      'category_id': ['exact'],
      'price': ['gt', 'lt']
    }

class CustomerFilter(FilterSet):
  class Meta:
    model = Customer
    fields = {
      'phone_number': ['exact']
    }    

class AvailabilityFilter(FilterSet):
  date = DateFromToRangeFilter()
  class Meta:
    model = Availability
    fields = {
      'staff': ['exact'],
    }

class AppointmentFilter(FilterSet):
  class Meta:
    model = Appointment
    fields = {
      'staff': ['exact'],
      'date': ['exact']
    }    