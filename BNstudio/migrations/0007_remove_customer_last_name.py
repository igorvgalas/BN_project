# Generated by Django 4.1.7 on 2023-03-15 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0006_alter_review_options_alter_service_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='last_name',
        ),
    ]
