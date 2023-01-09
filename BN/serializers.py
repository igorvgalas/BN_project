from rest_framework import serializers
from orders.models import Order_client


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_client
        fields = ['id', 'appointment_date', 'appointment_time', 'service_name']
