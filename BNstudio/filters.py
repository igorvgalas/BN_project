from django_filters.rest_framework import FilterSet
from .models import Service

class ProductFilter(FilterSet):
  class Meta:
    model = Service
    fields = {
      'category_id': ['exact'],
      'price': ['gt', 'lt']
    }