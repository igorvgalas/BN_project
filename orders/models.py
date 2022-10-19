from django.db import models
from django.utils import timezone
#from services.models import Service
from clients.models import Client
#from masters.models import Master


class Order(models.Model):
    appointment_date = models.DateField(blank=True, null=True)
    service_name = models.CharField(max_length=255, blank=True, null=True)
    pay_amount = models.IntegerField(blank=True, null=True)
    pay_method = models.CharField(max_length=50, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'orders'


'''class Order(models.Model):
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.get_current_timezone)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    master = models.ForeignKey(Master, on_delete=models.CASCADE)
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, default=0)'''
