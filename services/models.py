from django.db import models


class Service(models.Model):
    id = models.IntegerField(primary_key=True)
    serv_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.serv_name)

    class Meta:
        managed = False
        db_table = 'services'
        verbose_name = 'Список послуг'
        verbose_name_plural = 'Список послуг'
        ordering = ['id', 'serv_name']


'''class Service(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()'''
