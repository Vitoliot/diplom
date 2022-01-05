from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import procent_validator, memory_validator

class User(AbstractUser):
    icon = models.ImageField(blank=True, upload_to="static/profile_icons")
    task_in_day = models.PositiveIntegerField(choices=((5, 'LOW'), (7, 'NORMAL'), (9, 'HIGH')), default=5)

class Param(models.Model):
    date_init = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ['-date_init']

class BOFI(Param):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="BOFI")
    BOFI = models.PositiveIntegerField()

class Memory(Param):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="Memory")
    VM = models.PositiveIntegerField(validators=[memory_validator])
    VMWP = models.PositiveIntegerField(validators=[memory_validator])
    LM = models.PositiveIntegerField(validators=[memory_validator])


class AA(Param):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="AA")
    AA = models.PositiveIntegerField()

class QER(Param):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="QER")
    QER = models.PositiveIntegerField()
    WPM = models.PositiveIntegerField()
    QU = models.PositiveIntegerField(validators=[procent_validator])
