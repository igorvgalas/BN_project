# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Client(models.Model):
    client_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(
        unique=True, max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clients'


class Order(models.Model):
    appointment_date = models.DateField(blank=True, null=True)
    service_name = models.CharField(max_length=255, blank=True, null=True)
    pay_amount = models.IntegerField(blank=True, null=True)
    pay_method = models.CharField(max_length=50, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'orders'


class Service(models.Model):
    id = models.IntegerField(primary_key=True)
    serv_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'services'
