from django.urls import path
from . import views


urlpatterns = [
    path('', views.client_index, name='clients_index'),
    path('<int:client_id>', views.client_detail, name='clients_detail')]
