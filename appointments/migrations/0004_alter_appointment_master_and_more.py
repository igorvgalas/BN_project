# Generated by Django 4.1.2 on 2023-01-03 17:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0005_servicecategory'),
        ('clients', '0004_alter_client_options'),
        ('masters', '0003_alter_master_table'),
        ('appointments', '0003_alter_appointment_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='master',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING, to='masters.master'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='phone_number',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING, to='clients.client'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(
                default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='services.service'),
        ),
    ]
