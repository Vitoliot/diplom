# Generated by Django 3.1.7 on 2022-04-11 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_activities', '0008_auto_20220321_1039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertasks',
            name='is_complete',
            field=models.BooleanField(default=True),
        ),
    ]
