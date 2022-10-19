from django.urls import path
from . import views


urlpatterns = [
    path('', views.master_index, name='masters_index'),
    path('<int:master_id>', views.master_detail, name='master_detail')]
