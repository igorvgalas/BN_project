from django.urls import path
from . import views


urlpatterns = [
    path('', views.appointments_index, name='appointments_index'),
    path('<int:appointment_id>', views.appointments_detail, name='appointments_detail')]
