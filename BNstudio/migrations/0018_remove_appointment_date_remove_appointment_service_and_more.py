# Generated by Django 4.1.7 on 2023-03-27 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0017_appointment_total_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='service',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='staff',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='time_slot',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='total_price',
        ),
        migrations.CreateModel(
            name='AppointmentItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('date', models.DateField(blank=True, null=True)),
                ('time_slot', models.TimeField(blank=True, null=True)),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='items', to='BNstudio.appointment')),
                ('service', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='BNstudio.service')),
                ('staff', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='BNstudio.staff')),
            ],
            options={
                'verbose_name': 'Записи',
                'verbose_name_plural': 'Записи',
            },
        ),
    ]
