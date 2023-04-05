from decimal import Decimal
from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from .signals import appointment_created
from . import models

class ServiceCategorySerializer(serializers.ModelSerializer):
    services_count = serializers.IntegerField(read_only=True)   
    
    class Meta:
        model = models.ServiceCategory
        fields = ['id','title','services_count']



class ServiceSerializer(serializers.ModelSerializer):
    discount_price = serializers.SerializerMethodField(
        method_name='price_with_discount')           
    
    class Meta:
        model = models.Service
        fields = ['id','title','price','category',
                   'discount_price', 'slug', 'make_time']  
    

    def price_with_discount(self, service: models.Service):
        return service.price * Decimal(0.9)
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = ['id', 'date', 'title']

    def create(self, validated_data):
        service_id = self.context['service_id']
        return models.Review.objects.create(service_id=service_id, **validated_data)

class SimpleServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = ['id', 'title', 'price']  


class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    class Meta:
        model = models.Customer
        fields = ['id', 'user_id','phone_number', 'birth_date', 'membership', 'image']

class CartItemSerializer(serializers.ModelSerializer):
    service = SimpleServiceSerializer()

    def get_price(self, cart_item):
        return cart_item.service.price
    
    class Meta:
        model = models.CartItem
        fields = ['id', 'service']



class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum([item.service.price for item in cart.items.all()])

    class Meta:
        model = models.Cart
        fields = ['id', 'items', 'total_price']


class AddCartItemSerializer(serializers.ModelSerializer):
    service_id = serializers.PrimaryKeyRelatedField(
            queryset=models.Service.objects.all(),
            required=True)

    def validate_service_id(self, value):
        pk=value.pk
        if not models.Service.objects.filter(pk=pk).exists():
            raise serializers.ValidationError(
                'No service with the given ID was found.')
        return pk

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        service_id = self.validated_data['service_id']
        print(self.context)
        try:
            cart_item = models.CartItem.objects.get(
                cart_id=cart_id, service_id=service_id)
            cart_item.save()
            self.instance = cart_item
        except models.CartItem.DoesNotExist:
            self.instance = models.CartItem.objects.create(
                cart_id=cart_id, **self.validated_data)
        return self.instance

    class Meta:
        model = models.CartItem
        fields = ['id','service_id']

class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CartItem
        fields = ['service']

class AppointmentItemSerializer(serializers.ModelSerializer):
    service = SimpleServiceSerializer(read_only=True)

    class Meta:
        model = models.AppointmentItem
        fields = ['id','service']


class AppointmentSerializer(serializers.ModelSerializer):
    items = AppointmentItemSerializer(many=True)
    
    class Meta:
        model = models.Appointment
        fields = ['id','customer','items','placed_at','date','staff','time_slot','payment','payment_method', 'total_price']

class UpdateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Appointment
        fields = ['payment', 'payment_method']


class CreateAppointmentSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()
    total_price = serializers.DecimalField(max_digits=6,decimal_places=2,read_only=True,)
    staff_id = serializers.PrimaryKeyRelatedField(
            queryset=models.Staff.objects.all(),
            required=True)
    time_slot = serializers.ChoiceField(
            choices=[('10:00', '10:00'), ('11:30', '11:30'), ('13:00', '13:00'), 
                 ('14:30', '14:30'), ('16:00', '16:00'), ('17:30', '17:30')],
            required=True)
    date = serializers.DateField(required=True)

    def validate(self, data):
        cart_id = data['cart_id']
        staff_id = data['staff_id']
        date = data['date']
        time_slot = data['time_slot']

        if not models.Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError(
                'No cart with the given ID was found.')
        if models.CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError(
                'The cart is empty.')

        # Check if the staff is available for the given date and time_slot
        appointment_count = models.Appointment.objects.filter(
            staff_id=staff_id, date=date, time_slot=time_slot).count()
        if appointment_count > 0:
            raise serializers.ValidationError(
                f"{staff_id} is not available for {time_slot} on {date}. Please select another time.")

        return data
    
    
    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']
            staff_id = self._validated_data['staff_id']
            date = self._validated_data['date']
            time_slot = self._validated_data['time_slot']
            customer = models.Customer.objects.get(user_id=self.context['user_id'])
            cart = models.Cart.objects.get(pk=cart_id)
            total_price = sum(item.service.price for item in cart.items.all())

            appointment = models.Appointment.objects.create(
                customer=customer,
                total_price=total_price,
                staff = staff_id,
                time_slot= time_slot,
                date=date)

            cart_items = models.CartItem.objects.select_related('service').filter(cart_id=cart_id)
            
            appointment_items = [
                models.AppointmentItem(
                    appointment=appointment,
                    service=item.service,
                    price=item.service.price,
                ) for item in cart_items
            ]
            models.AppointmentItem.objects.bulk_create(appointment_items)
            
            cart.delete()

            appointment_created.send_robust(self.__class__, appointment=appointment)

            return appointment
              

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Staff  
        fields = ['id','name', 'age']      
