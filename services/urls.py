from django.urls import path
from .views import *


urlpatterns = [
    path('', ServiceIndex.as_view(), name='services_index'),
    path('<int:service_id>', ServiceDetail.as_view(), name='services_detail'),
    path('manicure/', ServiceManicure.as_view(), name='manicure'),
    path('pedicure/', ServicePedicure.as_view(), name='pedicure'),
    path('addnails/', ServiceAddNails.as_view(), name='addnails'),
    path('eyes/', ServiceEyes.as_view(), name='eyes')

]
