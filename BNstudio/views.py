from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action, permission_classes
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import AllowAny,IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import status
from .filters import OnlineAppointmentFilter, ServiceFilter, CustomerFilter, AvailabilityFilter, AppointmentFilter
from .models import *
from .serializers import *
from .permissions import ViewCustomerHistoryPermission
from .pagination import DefaultPagination

class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter,OrderingFilter]
    filterset_class = ServiceFilter
    #pagination_class = DefaultPagination
    #permission_classes = AllowAny
    search_fields = ['name', 'category']
    orderind_fields =['price', ]  

    def get_serializer_context(self):
        return {'request': self.request}     

    def destroy(self, request, *args, **kwargs):
        if Appointment.objects.filter(service_id=kwargs['pk']).count() > 0:
            return Response({'error': 'Service cannot be deleted because it is associated with an appointment.'}, 
                    status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return super().destroy(request, *args, **kwargs)          

class ServiceCategoryViewSet(ModelViewSet):
    queryset = ServiceCategory.objects.annotate(
        services_count = Count('service')).all()
    serializer_class = ServiceCategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter,OrderingFilter]
    #pagination_class = DefaultPagination
    #permission_classes =AllowAny

    def get_serializer_context(self):
        return {'request': self.request} 
    
    def destroy(self, request, *args, **kwargs):
        if Service.objects.filter(category_id = kwargs['pk']):
            return Response({'error': 'Category cannot be deleted because it includes one or more services.'}, 
                    status=status.HTTP_405_METHOD_NOT_ALLOWED)

class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(service_id=self.kwargs['service__pk'])

    def get_serializer_context(self):
        return {'service_id': self.kwargs['service__pk']}
    
class CustomerViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    #pagination_class = DefaultPagination
    #permission_classes = [IsAdminUser]
    filterset_class = CustomerFilter
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['id', 'phone_number']
    
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
        

class CartViewSet(CreateModelMixin,
                  RetrieveModelMixin,
                  DestroyModelMixin,
                  GenericViewSet):
    queryset = Cart.objects.prefetch_related('items__service').all()
    serializer_class = CartSerializer


class CartItemViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_queryset(self):
        return CartItem.objects \
            .filter(cart_id=self.kwargs['cart__pk']) \
            .select_related('service')
    
    def get_serializer_context(self):
        return {'cart_id': self.kwargs['cart__pk']}


class AppointmentViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = AppointmentFilter
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH','DELETE']:
            return [IsAdminUser()]
        return [AllowAny()]

    def create(self, request, *args, **kwargs):
        serializer = CreateAppointmentSerializer(
            data=request.data,
            context={'user_id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        appointment = serializer.save()
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAppointmentSerializer
        elif self.request.method == 'PATCH':
            return UpdateAppointmentSerializer
        return AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.all()
        # user = self.request.user

        # if user.is_staff:
        #     return Appointment.objects.all()

        # customer_id = Customer.objects.only(
        #     'id').get(user_id=user.id)
        # return Appointment.objects.filter(customer_id=customer_id)

class AppointmentItemViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']
    serializer_class = AppointmentItemSerializer
    
    def get_permissions(self):
        if self.request.method in ['DELETE','POST']:
            return [IsAdminUser()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        return AppointmentItem.objects \
            .filter(appointment_id=self.kwargs['appointment__pk']) \
            .select_related('service')
    
    def get_serializer_context(self):
        return {'appointment_id': self.kwargs['appointment__pk']}

class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    #permission_classes = AllowAny
    ordering_fields = ['id','name']   
    #pagination_class = DefaultPagination

class AvailabilityViewSet(ModelViewSet):
    serializer_class = AvailabilitySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = AvailabilityFilter
    #pagination_class = DefaultPagination

    def get_queryset(self):
        return Availability.objects.select_related('staff').all()

class OnlineAppointmentViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = OnlineAppointmentFilter
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    
    def create(self, request, *args, **kwargs):
        serializer = CreateOnlineAppointmentSerializer(
            data=request.data)
        serializer.is_valid(raise_exception=True)
        online_appointment = serializer.save()
        serializer = OnlineAppointmentSerializer(online_appointment)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOnlineAppointmentSerializer
        elif self.request.method == 'PATCH':
            return UpdateOnlineAppointmentSerializer
        return OnlineAppointmentSerializer

    def get_queryset(self):
        return OnlineAppointment.objects.all()
    