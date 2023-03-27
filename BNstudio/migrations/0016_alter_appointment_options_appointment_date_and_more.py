# Generated by Django 4.1.7 on 2023-03-27 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0015_rename_end_time_appointmentitem_time_slot_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='appointment',
            options={'permissions': [('cancel_order', 'Can cancel order')], 'verbose_name': 'Замовлення', 'verbose_name_plural': 'Замовлення'},
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='BNstudio.service'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='staff',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='BNstudio.staff'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time_slot',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='AppointmentItem',
        ),
    ]
