# Generated by Django 4.1.2 on 2022-10-20 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_alter_order_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderWithClientData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appointment_date', models.DateField(blank=True, null=True)),
                ('service_name', models.CharField(blank=True, max_length=255, null=True)),
                ('pay_amount', models.IntegerField(blank=True, null=True)),
                ('pay_method', models.CharField(blank=True, max_length=50, null=True)),
                ('client_name', models.CharField(blank=True, max_length=50, null=True)),
                ('phone_number', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'orders_with_client_data',
                'managed': False,
            },
        ),
    ]