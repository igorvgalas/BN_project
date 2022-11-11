from django.db import models
from django.utils import timezone
from services.models import Service
from clients.models import Client
#from masters.models import Master


class Order(models.Model):
    appointment_date = models.DateField(blank=True, null=True)
    service_name = models.CharField(max_length=255, blank=True, null=True)
    pay_amount = models.IntegerField(blank=True, null=True)
    pay_method = models.CharField(max_length=50, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.appointment_date)

    class Meta:
        managed = False
        db_table = 'orders'
        verbose_name = 'Список замовлень'
        verbose_name_plural = 'Список замовлень'


class OrderWithClientData(models.Model):
    appointment_date = models.DateField(blank=True, null=True)
    service_name = models.CharField(max_length=255, blank=True, null=True)
    pay_amount = models.IntegerField(blank=True, null=True)
    pay_method = models.CharField(max_length=50, blank=True, null=True)
    client_name = models.CharField(max_length=50, blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders_with_client_data'


class Order_client(models.Model):
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    service_name = models.ForeignKey(Service, on_delete=models.DO_NOTHING)
    client_name = models.CharField(max_length=50)
    phone_number = models.IntegerField()

    def __str__(self):
        return str(self.appointment_date)

    class Meta:
        managed = True
        db_table = 'orders_clients'
        verbose_name = 'Онлайн запис'
        verbose_name_plural = 'Онлайн запис'


'''class Order(models.Model):
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.get_current_timezone)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    master = models.ForeignKey(Master, on_delete=models.CASCADE)
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, default=0)'''
