from django.contrib import admin
from django.conf import settings
from django.db import models
from uuid import uuid4
from django.core.validators import MinValueValidator

class Customer(models.Model):
    MEMBERSHIP_BRONZE = 'B'
    MEMBERSHIP_SILVER = 'S'
    MEMBERSHIP_GOLD = 'G'

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, 'No card'),
        (MEMBERSHIP_SILVER, '3 percent card'),
        (MEMBERSHIP_GOLD, '10 percent card'),
    ]
    phone_number = models.CharField(
        unique=True, max_length=255, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    membership = models.CharField(
        max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name
    
    class Meta:
        ordering = ['user__first_name','user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]
        verbose_name = 'Клієнти'
        verbose_name_plural = 'Клієнти'


class ServiceCategory(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    featured_service = models.ForeignKey(
        'Service', on_delete=models.SET_NULL, null=True, related_name='+', blank=True)
    
    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = 'Категорії'
        verbose_name_plural = 'Категорії'
        ordering = ['id', 'title']


class Service(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(null=True)
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(1)])
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.DO_NOTHING)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = 'Послуги'
        verbose_name_plural = 'Послуги'
        ordering = ['id', 'title']        

class Staff(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()


    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Персонал'
        verbose_name_plural = 'Персонал'

class Status(models.Model): 
    title =  models.CharField(max_length=30)
    timestamp = models.DateTimeField(auto_now_add=True)     

    def __str__(self):
        return self.title

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

class AppointmentItem(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.PROTECT, related_name='items')
    service = models.ForeignKey(
        Service, on_delete=models.PROTECT, related_name='orderitems')
    price = models.DecimalField(max_digits=6, decimal_places=2)

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='items')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    

    class Meta:
        unique_together = [['cart', 'service']]    

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
    title = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.title

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
        return self.appointment

    class Meta:
        verbose_name = 'Оплата'
        verbose_name_plural = 'Оплата'

class Review(models.Model):
    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, related_name='reviews')
    title = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.service

    class Meta:
        verbose_name = 'Огляд'
        verbose_name_plural = 'Огляд'