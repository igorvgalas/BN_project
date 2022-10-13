from django.db import models
from django.utils import timezone


class Service(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()

    def __str_(self):
        return self.name


class Master(models.Model):
    name = models.CharField(max_length=30)
    experience = models.IntegerField()
    age = models.IntegerField()


class Client(models.Model):
    name = models.CharField(max_length=30)
    phone_number = models.IntegerField()


class Order(models.Model):
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.get_current_timezone)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    master = models.ForeignKey(Master, on_delete=models.CASCADE)
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, default=0)
