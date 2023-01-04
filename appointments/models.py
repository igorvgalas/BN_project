from django.db import models
from django.utils import timezone
from clients.models import Client
from masters.models import Master
from services.models import Service


class Appointment(models.Model):
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.get_current_timezone)
    client_name = models.CharField(max_length=50)
    phone_number = models.ForeignKey(Client, on_delete=models.DO_NOTHING)
    master = models.ForeignKey(
        Master, default=None, on_delete=models.DO_NOTHING)
    service = models.ForeignKey(
        Service, default=None, on_delete=models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'appointments'
        verbose_name = 'Запис клієнтів'
        verbose_name_plural = 'Запис клієнтів'
