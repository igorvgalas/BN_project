from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('categories', views.ServiceCategoryViewSet)
router.register('services', views.ServiceViewSet, basename='services')
router.register('customers', views.CustomerViewSet)
router.register('carts', views.CartViewSet)
router.register('appointments', views.AppointmentViewSet, basename='appointments')
router.register('staff', views.StaffViewSet, basename='staff')
router.register('availability', views.AvailabilityViewSet, basename= 'availability')
router.register('onlineappointment', views.OnlineAppointmentViewSet, basename= 'onlineappointment')

services_router = routers.NestedSimpleRouter(
    router, 'services', lookup='service')
services_router.register('reviews', views.ReviewViewSet,
                         basename='service-reviews')
appointments_router= routers.NestedSimpleRouter(
    router, 'appointments', lookup='appointment')
appointments_router.register('items', views.AppointmentItemViewSet, basename='appointment-items')

carts_router = routers.NestedSimpleRouter(router, 'carts',lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')

urlpatterns = router.urls + services_router.urls + carts_router.urls + appointments_router.urls


