# Generated by Django 3.1.7 on 2022-01-31 17:57

from django.db import migrations, models
import user_profile.validators


class Migration(migrations.Migration):

    dependencies = [
        ('user_activities', '0004_auto_20220131_2054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertasks',
            name='correctness',
            field=models.FloatField(default=0, validators=[user_profile.validators.procent_validator]),
        ),
    ]
