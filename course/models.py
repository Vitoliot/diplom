from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from sympy import false
from user_profile.models import User


class EducationObject(models.Model):
    title = models.CharField(max_length=100)
    overview = models.TextField()
    date_create = models.DateField(auto_now_add=True)
    date_update = models.DateField(blank=True, null=True)
    created_by = models.CharField(max_length=100)

    class Meta:
        abstract = True

# Create your models here.


class Course(EducationObject):
    pass


class Module(EducationObject):
    number = models.PositiveIntegerField()
    course = models.ForeignKey(
        Course, on_delete=CASCADE, related_name="modules")

    def __str__(self):
        return f'{self.number}. {self.title}'

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
        return f'{self.type_choices[self.type-1][1]}'


class TaskTheme(models.Model):
    theme_choices = [
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
        return f'{self.theme_choices[self.theme-1][1]}'


class TaskMethodOfLearning(models.Model):
    methods_of_learning_choices = [
        (1, 'активный'),
        (2, 'пассивный'),
        (3, 'интерактивный'),
    ]
    method_of_learning = models.PositiveIntegerField(
        choices=methods_of_learning_choices)

    def __str__(self) -> str:
        return f'{self.methods_of_learning_choices[self.method_of_learning-1][1]}'


class TaskDoHaveTest(models.Model):
    do_have_test_choices = [
        (1, 'не тестовое'),
        (2, 'закрытое'),
        (3, 'открытое'),
    ]
    do_have_test = models.PositiveIntegerField(choices=do_have_test_choices)

    def __str__(self) -> str:
        return f'{self.do_have_test_choices[self.do_have_test-1][1]}'


class TaskTestProperties(models.Model):
    test_property_choices = [
        (1, 'динамическое'),
        (2, 'стохастическое'),
        (3, 'детерминированное'),
    ]

    test_property = models.PositiveIntegerField(choices=test_property_choices)

    def __str__(self) -> str:
        return f'{self.test_property_choices[self.test_property-1][1]}'


class TaskTarget(models.Model):
    target_choices = [
        (1, 'информационная'),
        (2, 'диагностическая'),
        (3, 'обучающая'),
        (4, 'мотивационная'),
    ]

    target = models.PositiveIntegerField(choices=target_choices)

    def __str__(self) -> str:
        return f'{self.target_choices[self.target-1][1]}'


class TaskRSP(models.Model):
    rsp_choices = [
        (1, 'визуальная'),
        (2, 'дигитальная'),
        (3, 'аудиальная'),
    ]

    rsp = models.PositiveIntegerField(choices=rsp_choices)

    def __str__(self) -> str:
        return f'{self.rsp_choices[self.rsp-1][1]}'


class TaskToken(models.Model):
    token_choices = [
        (1, 'слово'),
        (2, 'словосочетание'),
        (3, 'предложение'),
        (4, 'абзац'),
        (5, 'текст'),
    ]

    task_token = models.PositiveIntegerField(choices=token_choices)

    def __str__(self) -> str:
        return f'{self.token_choices[self.task_token-1][1]}'


class TaskTargetAudience(models.Model):
    target_audience_choices = [
        (1, 'дети'),
        (2, 'взрослые')
    ]

    target_audience = models.PositiveIntegerField(
        choices=target_audience_choices)

    def __str__(self) -> str:
        return f'{self.target_audience_choices[self.target_audience-1][1]}'


class Item(models.Model):
    title = models.CharField(max_length=100)
    overview = models.CharField(max_length=500)
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(blank=True)
    content = models.TextField(blank=True)
    icon = models.ImageField(blank=True, upload_to="static/tasks_icons")


class Task(EducationObject):
    type = models.ForeignKey(TaskType, on_delete=PROTECT,
                             related_name='task', )
    theme = models.ForeignKey(
        TaskTheme, on_delete=PROTECT, related_name='task', )
    method = models.ForeignKey(
        TaskMethodOfLearning, on_delete=PROTECT, related_name='task', )
    have_test = models.ForeignKey(
        TaskDoHaveTest, on_delete=PROTECT, related_name='task', )
    test_prop = models.ForeignKey(
        TaskTestProperties, on_delete=PROTECT, related_name='task', )
    target = models.ForeignKey(
        TaskTarget, on_delete=PROTECT, related_name='task', )
    target_audience = models.ForeignKey(
        TaskTargetAudience, on_delete=PROTECT, related_name='task', )
    rsp = models.ForeignKey(TaskRSP, on_delete=PROTECT,
                            related_name='task', )
    token = models.ForeignKey(
        TaskToken, on_delete=PROTECT, related_name='task', )
    adaptivity = models.BooleanField(default=False)
    control = models.BooleanField(default=False)
    individual = models.BooleanField(default=False)
    toQER = models.BooleanField(default=False)
    toBOFI = models.BooleanField(default=False)
    toAA = models.BooleanField(default=False)
    toVM = models.BooleanField(default=False)
    toVMWP = models.BooleanField(default=False)
    toLM = models.BooleanField(default=False)
    fast_to_do = models.BooleanField(default=False)
    fast_to_complete = models.BooleanField(default=False)
    effectivity = models.BooleanField(default=False)
    chalenge = models.BooleanField(default=False)
    compressed = models.BooleanField(default=False)
    gaming = models.BooleanField(default=False)
    modules = models.ManyToManyField(
        Module, through='ModuleTasks', through_fields=('task', 'module'))
    items = models.ManyToManyField(Item, blank=True)
    isOnSite = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title}'


class ModuleTasks(models.Model):
    number = models.PositiveIntegerField()
    module = models.ForeignKey(
        Module, on_delete=CASCADE, related_name='moduletasks')
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
