# Generated by Django 4.2.1 on 2023-05-29 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0028_alter_availability_date_onlineappointment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onlineappointment',
            name='date',
            field=models.DateField(default=None),
        ),
    ]