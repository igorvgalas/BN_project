# Generated by Django 4.1.2 on 2022-11-10 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0003_alter_client_table'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='client',
            options={'managed': False, 'ordering': ['id'], 'verbose_name': 'Список клієнтів', 'verbose_name_plural': 'Список клієнтів'},
        ),
    ]
