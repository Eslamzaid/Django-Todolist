# Generated by Django 4.2.4 on 2023-08-16 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoFun', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todolist',
            name='time',
            field=models.TimeField(),
        ),
    ]
