from django.db import models


class Service(models.Model):
    id = models.IntegerField(primary_key=True)
    serv_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.pk)

    class Meta:
        managed = False
        db_table = 'services'


'''class Service(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()'''
