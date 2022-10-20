from django.db import models
from django.utils import timezone


class Appointment(models.Model):
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.get_current_timezone)
    client_name = models.CharField(max_length=50, blank=False, null=False)
    phone_number = models.CharField(max_length=50, blank=False, null=False)
    master = models.CharField(max_length=50, blank=False, null=False)
    service = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'appointments'
