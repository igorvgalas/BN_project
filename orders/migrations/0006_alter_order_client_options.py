# Generated by Django 4.1.2 on 2022-11-11 18:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_order_client_alter_order_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order_client',
            options={'managed': True, 'verbose_name': 'Онлайн запис', 'verbose_name_plural': 'Онлайн запис'},
        ),
    ]
