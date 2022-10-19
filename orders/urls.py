from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='orders_index'),
    path('<int:order_id>', views.detail, name='orders_detail')]
