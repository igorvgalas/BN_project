from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='services_index'),
    path('<int:service_id>', views.detail, name='services_detail')
]
