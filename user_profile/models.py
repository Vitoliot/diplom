from django.db import models
from django import forms
from django.contrib.auth.models import AbstractUser
from .validators import procent_validator, memory_validator


class User(AbstractUser):
    icon = models.ImageField(
        blank=True, upload_to="static\profile_icons")
    task_in_day = models.PositiveIntegerField(
        choices=((5, 'LOW'), (7, 'NORMAL'), (9, 'HIGH')), default=5)

    REQUIRED_FIELDS = ['id', 'first_name',
                       'last_name', 'email', 'icon', 'task_in_day']


class Param(models.Model):
    date_init = models.DateTimeField(
        auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ['-date_init']


class BOFI(Param):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="BOFI")
    value = models.PositiveIntegerField()


class VM(Param):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="VM")
    value = models.PositiveIntegerField(validators=[memory_validator])


class VMWP(Param):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="VMWP")
    value = models.PositiveIntegerField(validators=[memory_validator])


class LM(Param):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="LM")
    value = models.PositiveIntegerField(validators=[memory_validator])


class AA(Param):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="AA")
    value = models.PositiveIntegerField()


class QER(Param):
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="QER")
    value = models.PositiveIntegerField()
    WPM = models.PositiveIntegerField()
    QU = models.PositiveIntegerField(validators=[procent_validator])
