# Generated by Django 3.1.7 on 2022-01-17 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0007_auto_20220117_1441'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='icon',
            field=models.ImageField(blank=True, upload_to='tasks_icons'),
        ),
    ]
