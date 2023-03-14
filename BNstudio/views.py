from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from BNstudio.pagination import DefaultPagination
from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action, permission_classes
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import AllowAny, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import status
from .filters import ProductFilter
from .models import ServiceCategory, Service, Appointment, Review, Customer
from .serializers import ServiceCategorySerializer, ServiceSerializer, ReviewSerializer, CustomerSerializer
from .permissions import ViewCustomerHistoryPermission

class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter,OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = DefaultPagination
    search_fields = ['name', 'category']
    orderind_fields =['price', ]  

    def get_serializer_context(self):
        return {'request': self.request}     

    def destroy(self, request, *args, **kwargs):
        if Appointment.objects.filter(service_id=kwargs['pk']).count() > 0:
            return Response({'error': 'Service cannot be deleted because it is associated with an appointment.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return super().destroy(request, *args, **kwargs)          

class ServiceCategoryViewSet(ModelViewSet):
    queryset = ServiceCategory.objects.annotate(
        services_count = Count('service')).all()
    serializer_class = ServiceCategorySerializer

    def destroy(self, request, *args, **kwargs):
        if Service.objects.filter(category_id = kwargs['pk']):
            return Response({'error': 'Category cannot be deleted because it includes one or more services.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(service_id=self.kwargs['service_pk'])

    def get_serializer_context(self):
        return {'service_id': self.kwargs['service_pk']}
    
class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, permission_classes=[ViewCustomerHistoryPermission])
    def history(self, request, pk):
        return Response('ok')

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        customer = Customer.objects.get(
            user_id=request.user.id)
        if request.method == 'GET':
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = CustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)    
