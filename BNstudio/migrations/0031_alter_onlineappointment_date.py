# Generated by Django 4.2.1 on 2023-05-30 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0030_onlineappointment_service'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onlineappointment',
            name='date',
            field=models.DateField(blank=True, default=None, null=True),
        ),
    ]