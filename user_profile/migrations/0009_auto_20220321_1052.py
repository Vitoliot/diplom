# Generated by Django 3.1.7 on 2022-03-21 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0008_auto_20220321_1047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='icon',
            field=models.ImageField(blank=True, upload_to='static\\profile_icons'),
        ),
    ]