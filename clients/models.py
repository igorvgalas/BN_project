from django.db import models


class Client(models.Model):
    client_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(
        unique=True, max_length=255, blank=True, null=True)

    def __str__(self):
        return self.client_name

    class Meta:
        managed = False
        db_table = 'clients'
        verbose_name = 'Список клієнтів'
        verbose_name_plural = 'Список клієнтів'
        ordering = ['id', ]


'''class Client(models.Model):
    name = models.CharField(max_length=30)
    phone_number = models.IntegerField()'''
