from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='appointments_index'),
    path('<int:appointment_id>', views.detail, name='appointments_detail')]
