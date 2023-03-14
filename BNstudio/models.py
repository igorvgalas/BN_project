from django.db import models
from uuid import uuid4
from django.core.validators import MinValueValidator

class Customer(models.Model):
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(
        unique=True, max_length=255, blank=True, null=True)

    def __str__(self):
        return self.first_name + self.last_name

    class Meta:
        verbose_name = 'Клієнти'
        verbose_name_plural = 'Клієнти'
        ordering = ['id', ]

class ServiceCategory(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    featured_service = models.ForeignKey(
        'Service', on_delete=models.SET_NULL, null=True, related_name='+', blank=True)
    
    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Категорії'
        verbose_name_plural = 'Категорії'
        ordering = ['id', 'name']


class Service(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(null=True)
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(1)])
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.DO_NOTHING)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Послуги'
        verbose_name_plural = 'Послуги'
        ordering = ['id', 'name']        

class Staff(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()


    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Персонал'
        verbose_name_plural = 'Персонал'

class Status(models.Model): 
    name =  models.CharField(max_length=30)
    timestamp = models.DateTimeField(auto_now_add=True)     

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Статус'
        verbose_name_plural = 'Статус'

class Appointment(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING,blank=True, null=True)
    staff = models.ForeignKey(Staff,on_delete=models.DO_NOTHING, blank=True, null=True)
    service = models.ForeignKey(Service, on_delete=models.DO_NOTHING,blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    status = models.ForeignKey(Status, on_delete=models.DO_NOTHING,blank=True, null=True)

    def __str__(self):
        return f"{self.staff} + ' ' + {self.service}"

    class Meta:
        verbose_name = 'Список замовлень'
        verbose_name_plural = 'Список замовлень'

class Avability(models.Model):
    staff = models.ForeignKey(Staff,on_delete=models.DO_NOTHING,blank=True, null=True)
    start_time=models.TimeField(blank=True, null=True)
    end_time=models.TimeField(blank=True, null=True)
    date=models.DateField(blank=True, null=True)

    def __str__(self):
        return str(self.date)

    class Meta:
        verbose_name = 'Доступність'
        verbose_name_plural = 'Доступність'

class PaymentMethod(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Спосіб оплати'
        verbose_name_plural = 'Спосіб оплати'


class Payment(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.DO_NOTHING,blank=True, null=True)
    amount = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(1)])
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.DO_NOTHING,blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Оплата'
        verbose_name_plural = 'Оплата'

class Review(models.Model):
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)