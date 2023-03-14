from decimal import Decimal
from rest_framework import serializers
from .models import ServiceCategory, Service, Review, Appointment,Customer

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id','name','services_count']

    services_count = serializers.IntegerField(read_only=True)   


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id','name','price','category',
                   'discount_price', 'slug']  
    
    discount_price = serializers.SerializerMethodField(
        method_name='price_with_discount')           

    def price_with_discount(self, service: Service):
        return service.price * Decimal(0.9)
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'date', 'name']

    def create(self, validated_data):
        service_id = self.context['service_id']
        return Review.objects.create(service_id=service_id, **validated_data)

class SimpleServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'price']  

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'user_id', 'first_name', 'last_name','phone_number']

class AppointmentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['customer', 'staff', 'service', 
                  'date','start_time','end_time', 'status']


        
