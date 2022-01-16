from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from user_profile.models import User


class EducationObject(models.Model):
    title = models.CharField(max_length=100)
    overview = models.CharField(max_length=500, blank=True)
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=PROTECT)

    class Meta:
        abstract = True

# Create your models here.
class Course(EducationObject):
    pass

class Module(EducationObject):
    number = models.PositiveIntegerField()
    course = models.ForeignKey(Course, on_delete=CASCADE, related_name="modules")

    def __str__(self):
        return f'{self.number}. {self.title} {self.overview}'

    class Meta:
        ordering = ['number', 'course']
        unique_together = ['number', 'course']

class TaskType(models.Model):
    type_choices = [
        (1, 'текстовое задание'),
        (2, 'задание с картинкой'),
        (3, 'другое')]

    type = models.PositiveIntegerField(choices=type_choices)

    def __str__(self) -> str:
        return f'{self.type_choices[self.type-2][1]}'


class TaskTheme(models.Model):
    theme_choices=[
        (1, 'Избавление от проговаривания'),
        (2, 'Схватывание и нахождение информации'),
        (3, 'Работа с текстом'),
        (4, 'Широта зрения'),
        (5, 'Зрительная память'),
        (6, 'Логическая память'),
        (7, 'Внимание'),
        (8, 'Регрессии'),
    ]
    theme = models.PositiveIntegerField(choices=theme_choices)

    def __str__(self) -> str:
        return f'{self.theme_choices[self.theme-2][1]}'

class Item(models.Model):
    title = models.CharField(max_length=100)
    overview = models.CharField(max_length=500)
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(blank=True)
    content = models.TextField(blank=True)
    icon = models.ImageField(blank=True, upload_to="static/tasks_icons/")

class Task(EducationObject):
    type = models.ForeignKey(TaskType, on_delete=PROTECT, related_name='task')
    theme = models.ForeignKey(TaskTheme, on_delete=PROTECT, related_name='task')
    modules = models.ManyToManyField(Module, through='ModuleTasks', through_fields=('task', 'module'))
    items = models.ManyToManyField(Item, blank=True)


class ModuleTasks(models.Model):
    number = models.PositiveIntegerField()
    module = models.ForeignKey(Module, on_delete=CASCADE)
    task = models.ForeignKey(Task, on_delete=CASCADE)

    class Meta:
        unique_together = ['number', 'task', "module"]
        ordering = ['module', 'number']

class Question(models.Model):
    number = models.PositiveIntegerField()
    item = models.ForeignKey(Item, on_delete=CASCADE, related_name="questions")
    question = models.CharField(max_length=300)
    answer = models.CharField(max_length=100)
    posible_answer_1 = models.CharField(max_length=100, blank=True)
    posible_answer_2 = models.CharField(max_length=100, blank=True)
    posible_answer_3 = models.CharField(max_length=100, blank=True)