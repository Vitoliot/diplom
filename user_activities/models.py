from datetime import datetime
from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from matplotlib.style import use
from user_profile.validators import procent_validator
from course.models import Course, ModuleTasks, Question, Item
from user_profile.models import User
from django.db.models.signals import pre_save, post_save, pre_delete
from django.dispatch.dispatcher import receiver
# Create your models here.


class UserDaily(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    date_init = models.DateField(auto_now_add=True)
    amount_of_tasks = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ['user', 'date_init']


class UserCourses(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    course = models.ForeignKey(Course, on_delete=CASCADE)
    date_init = models.DateTimeField(auto_now_add=True)
    is_complete = models.BooleanField(default=False)
    date_close = models.DateTimeField(null=True, blank=True)


class UserTasks(models.Model):
    task = models.ForeignKey(ModuleTasks, on_delete=PROTECT)
    date_init = models.DateTimeField(auto_now_add=True)
    time = models.PositiveIntegerField()
    correctness = models.FloatField(
        validators=[procent_validator], default=0)
    is_complete = models.BooleanField(default=True)
    usercourse = models.ForeignKey(
        UserCourses, on_delete=CASCADE, blank=True, related_name='usertasks')


@receiver(post_save, sender=UserTasks)
def check_course_ending(sender, instance, **kwargs):
    usercourse = UserCourses.objects.get(id=instance.usercourse.id)
    usertasks = UserTasks.objects.filter(usercourse=usercourse.id)
    uc_flag = True
    for task in usertasks:
        if not task.is_complete:
            uc_flag = False
            break
    if uc_flag:
        usercourse.is_complete = True
        usercourse.date_close = datetime.now()
        usercourse.save()


class Answer(models.Model):
    usertask = models.ForeignKey(
        UserTasks, on_delete=CASCADE, related_name="answers")
    number = models.PositiveIntegerField()
    answer = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)
    date_init = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey(Item, on_delete=PROTECT, blank=True)


@receiver(pre_save, sender=Answer)
def check_correctness_usertasks(sender, instance, **kwargs):
    usertask = UserTasks.objects.get(id=instance.usertask.id)
    questions = Question.objects.filter(item=instance.item)
    for question in questions:
        if question.number == instance.number:
            if question.answer == instance.answer:
                instance.is_correct = True
                usertask.correctness = (
                    1/len(questions))*100 + usertask.correctness
            elif instance.is_correct:
                usertask.correctness = usertask.correctness - \
                    (1/len(questions))*100
                instance.is_correct = False
    usertask.is_complete = True

    usertask.save()


@receiver(pre_delete, sender=Answer)
def pre_delete_check_correctness_usertasks(sender, instance, **kwargs):
    usertask = UserTasks.objects.get(id=instance.usertask.id)
    questions = Question.objects.filter(item=instance.item)
    if sender.is_correct:
        usertask.correctness = usertask.correctness - \
            (1/len(questions))*100
    if (usertask.correctness < 40): 
        usertask.is_complete = False
    usertask.save()