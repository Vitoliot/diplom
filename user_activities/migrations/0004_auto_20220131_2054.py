# Generated by Django 3.1.7 on 2022-01-31 17:54

from django.db import migrations, models
import django.db.models.deletion
import user_profile.validators


class Migration(migrations.Migration):

    dependencies = [
        ('user_activities', '0003_usertasks_is_complete'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='usertask',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='user_activities.usertasks'),
        ),
        migrations.AlterField(
            model_name='usertasks',
            name='correctness',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=4, validators=[user_profile.validators.procent_validator]),
        ),
        migrations.AlterField(
            model_name='usertasks',
            name='usercourse',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='usertasks', to='user_activities.usercourses'),
        ),
    ]
