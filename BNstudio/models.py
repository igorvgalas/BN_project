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

class PaymentMethod(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Спосіб оплати'
        verbose_name_plural = 'Спосіб оплати'


class Appointment(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING,blank=True, null=True)
    placed_at = models.DateTimeField(auto_now_add=True)
    payment = models.CharField(blank=True, null=True, max_length=50, choices=PAYMENT_CHOICES, default=PAYMENT_STATUS_PENDING)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.DO_NOTHING,blank=True, null=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(1)], default=0)
    
    def __str__(self):
        return f"{self.customer} {self.placed_at.date()}"

    class Meta:
        verbose_name = 'Замовлення'
        verbose_name_plural = 'Замовлення'
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]

class AppointmentItem(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.PROTECT, related_name='items')
    staff = models.ForeignKey(Staff,on_delete=models.DO_NOTHING, blank=True, null=True)
    service = models.ForeignKey(Service, on_delete=models.DO_NOTHING,blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(blank=True, null=True)
    time_slot = models.TimeField(blank=True, null=True)

    class Meta:
        verbose_name = 'Записи'
        verbose_name_plural = 'Записи'    
    
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
    date=models.DateField(blank=True, null=True)

    def __str__(self):
        return str(self.date)

    class Meta:
        verbose_name = 'Доступність'
        verbose_name_plural = 'Доступність'


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
