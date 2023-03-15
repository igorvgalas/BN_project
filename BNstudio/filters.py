from django_filters.rest_framework import FilterSet
from .models import Service, Customer

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
      'first_name': ['exact'],
      'phone_number': ['exact']
    }    