# Generated by Django 4.1.2 on 2022-11-10 18:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_alter_service_table'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='service',
            options={'managed': False, 'ordering': ['id', 'serv_name'], 'verbose_name': 'Список послуг', 'verbose_name_plural': 'Список послуг'},
        ),
    ]
