# Generated by Django 4.2.1 on 2023-05-31 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0033_rename_date_onlineappointment_appointmentdate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='onlineappointment',
            name='price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='onlineappointment',
            name='appointmentDate',
            field=models.DateField(blank=True, null=True),
        ),
    ]
