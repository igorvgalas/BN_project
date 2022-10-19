from django.db import models


class Client(models.Model):
    client_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(
        unique=True, max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clients'


'''class Client(models.Model):
    name = models.CharField(max_length=30)
    phone_number = models.IntegerField()'''
