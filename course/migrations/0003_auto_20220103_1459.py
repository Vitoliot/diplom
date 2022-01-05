# Generated by Django 3.1.7 on 2022-01-03 11:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_auto_20220102_1359'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskTheme',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theme', models.PositiveIntegerField(choices=[(1, 'Избавление от проговаривания'), (2, 'Схватывание и нахождение информации'), (3, 'Работа с текстом'), (4, 'Широта зрения'), (5, 'Зрительная память'), (6, 'Логическая память'), (7, 'Внимание'), (8, 'Регрессии')])),
            ],
        ),
        migrations.AddField(
            model_name='task',
            name='theme',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.PROTECT, to='course.tasktheme'),
            preserve_default=False,
        ),
    ]
