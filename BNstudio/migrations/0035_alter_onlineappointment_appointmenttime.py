# Generated by Django 4.2.1 on 2023-05-31 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0034_onlineappointment_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onlineappointment',
            name='appointmentTime',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
    ]
