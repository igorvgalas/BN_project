from django.db import models


class ServiceCategory(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    category_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.category_name)

    class Meta:
        managed = False
        db_table = 'services-category'
        verbose_name = 'Категорія послуг'
        verbose_name_plural = 'Категорія послуг'
        ordering = ['id', 'category_name']


class Service(models.Model):
    id = models.IntegerField(primary_key=True)
    serv_name = models.CharField(max_length=255, blank=True, null=True)
    service_category = models.ForeignKey(
        ServiceCategory, on_delete=models.DO_NOTHING)

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
