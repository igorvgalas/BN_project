# Generated by Django 4.1.7 on 2023-03-22 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0012_alter_appointment_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='placed_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
