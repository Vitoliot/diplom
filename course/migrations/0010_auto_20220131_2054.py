# Generated by Django 3.1.7 on 2022-01-31 17:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0009_auto_20220117_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moduletasks',
            name='module',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='moduletasks', to='course.module'),
        ),
    ]