# Generated by Django 4.2.1 on 2023-05-29 11:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0029_alter_onlineappointment_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='onlineappointment',
            name='service',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='BNstudio.service'),
        ),
    ]
