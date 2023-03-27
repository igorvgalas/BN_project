from decimal import Decimal
from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from .signals import appointment_created
from .models import ServiceCategory, Service, Review, Appointment,Customer, Staff, Cart, CartItem, AppointmentItem, Avability

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
    price =serializers.SerializerMethodField()

    def get_price(self, cart_item):
        return cart_item.service.price
    
    class Meta:
        model = CartItem
        fields = ['id', 'service', 'price']


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
        fields = ['id', 'service','staff','date', 'time_slot' ]


class AppointmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Appointment
        fields = ['id','customer','placed_at','payment','payment_method', 'total_price']

class UpdateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['payment', 'payment_method']


class CreateAppointmentSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()
    date = serializers.DateField()
    staff_id = serializers.IntegerField()
    time_slot = serializers.TimeField()
    total_price = serializers.DecimalField(max_digits=6,decimal_places=2,read_only=True,)


    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError(
                'No cart with the given ID was found.')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError(
                'The cart is empty.')
        return cart_id
    
    def validate_date(self, date):
        if date < timezone.now().date():
            raise serializers.ValidationError('Date cannot be in the past')
        if not date:
            raise serializers.ValidationError(
                'Date is required.')
        return date
    
    
    def validate_staff_id(self, staff_id):
        available_staff = Avability.objects.filter(
            date=self.validated_data['date'], 
            staff_id=staff_id
        )
        if not available_staff.exists():
            raise serializers.ValidationError(
                'Selected staff is not available on the given date.')
        
        return staff_id

    def validate_time_slot(self, time_slot):
        appointments = Appointment.objects.filter(
            date=self.validated_data['date'], 
            staff_id=self.validated_data['staff_id']
        )
        
        booked_time_slots = appointments.values_list(
            'time_slot', flat=True
        )
        
        available_time_slots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']
        for time_slot in booked_time_slots:
            if time_slot in available_time_slots:
                available_time_slots.remove(time_slot)
        
        if not available_time_slots:
            raise serializers.ValidationError(
                'Selected staff is fully booked on the given date.')
        return time_slot
    
    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']
            customer = Customer.objects.get(user_id=self.context['user_id'])
            staff_id = self.validated_data['staff_id']
            date = self.validated_data['date']
            time_slot = self.validated_data['time_slot']
            cart = Cart.objects.get(pk=cart_id)
            total_price = sum(item.service.price for item in cart.items.all())

            appointment = Appointment.objects.create(
                customer=customer,
                total_price=total_price,
                staff=staff_id,
                date=date,
                time_slot=time_slot,
            )

            cart_items = CartItem.objects.select_related('service').filter(cart_id=cart_id)
            
            appointment_items = [
                AppointmentItem(
                    appointment=appointment,
                    service=item.service,
                    price=item.service.price,
                ) for item in cart_items
            ]
            AppointmentItem.objects.bulk_create(appointment_items)

            cart.delete()

            appointment_created.send_robust(self.__class__, appointment=appointment)

            return appointment
              


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff  
        fields = ['name', 'age']      

