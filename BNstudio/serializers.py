from decimal import Decimal
from django.db import transaction
from rest_framework import serializers
from .models import ServiceCategory, Service, Review, Appointment,Customer, Staff, AppointmentItem, Cart, CartItem

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id','title','services_count']

    services_count = serializers.IntegerField(read_only=True)   


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id','title','price','category',
                   'discount_price', 'slug']  
    
    discount_price = serializers.SerializerMethodField(
        method_name='price_with_discount')           

    def price_with_discount(self, service: Service):
        return service.price * Decimal(0.9)
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'date', 'title']

    def create(self, validated_data):
        service_id = self.context['service_id']
        return Review.objects.create(service_id=service_id, **validated_data)

class SimpleServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'price']  

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Customer
        fields = ['id', 'user_id','phone_number', 'birth_date', 'membership']

class CartItemSerializer(serializers.ModelSerializer):
    service = SimpleServiceSerializer()
    price =serializers.SerializerMethodField

    def get_price(self, cart_item):
        return cart_item.service.price
    
    class Meta:
        model = CartItem
        fields = ['id', 'service']


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum([item.service.price for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']


class AddCartItemSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField()

    def validate_service_id(self, value):
        if not Service.objects.filter(pk=value).exists():
            raise serializers.ValidationError(
                'No service with the given ID was found.')
        return value

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        service_id = self.validated_data['service_id']

        try:
            cart_item = CartItem.objects.get(
                cart_id=cart_id, service_id=service_id)
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(
                cart_id=cart_id, **self.validated_data)

        return self.instance

    class Meta:
        model = CartItem
        fields = ['id', 'service_id']

class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['service']

class AppointmentItemSerializer(serializers.ModelSerializer):
    service = SimpleServiceSerializer()

    class Meta:
        model = AppointmentItem
        fields = ['id', 'service', 'price']


class AppointmentSerializer(serializers.ModelSerializer):
    items = AppointmentItemSerializer(many=True)

    class Meta:
        model = Appointment
        fields = ['customer', 'staff', 
                  'date','start_time','end_time','items']


class UpdateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status']


class CreateAppointmentSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError(
                'No cart with the given ID was found.')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty.')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']

            customer = Customer.objects.get(
                user_id=self.context['user_id'])
            appointment = Appointment.objects.create(customer=customer)

            cart_items = CartItem.objects \
                .select_related('service') \
                .filter(cart_id=cart_id)
            appointment_items = [
                AppointmentItem(
                    appointment=appointment,
                    service=item.service,
                    price=item.service.price
                ) for item in cart_items
            ]
            AppointmentItem.objects.bulk_create(appointment_items)

            Cart.objects.filter(pk=cart_id).delete()

            appointment_created.send_robust(self.__class__, appointment=appointment)

            return appointment
              


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff  
        fields = ['name', 'age']      

