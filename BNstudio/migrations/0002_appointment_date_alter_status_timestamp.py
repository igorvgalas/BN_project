# Generated by Django 4.1.7 on 2023-03-13 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BNstudio', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='status',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]