from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.db.models.query import QuerySet
from user_profile.validators import procent_validator
from course.models import Course, ModuleTasks, Question, Item
from user_profile.models import User
from django.db.models.signals import pre_save, post_save
from django.dispatch.dispatcher import receiver
# Create your models here.
class UserCourses(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    course = models.ForeignKey(Course, on_delete=CASCADE)
    date_init = models.DateTimeField(auto_now_add=True)
    date_close = models.DateTimeField(null=True, blank=True)


class UserTasks(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    task = models.ForeignKey(ModuleTasks, on_delete=PROTECT)
    date_init = models.DateTimeField(auto_now_add=True)
    time = models.PositiveIntegerField()
    correctness = models.DecimalField(validators=[procent_validator], max_digits=4, default=0, decimal_places=2)
    course = models.ForeignKey(Course, on_delete=CASCADE, blank=True)

# @receiver(post_save, sender = UserTasks)
# def check_correctness_usertasks(sender, instance, **kwargs):
#     try:
#         usertasks = UserTasks.objects.filter(user=instance.user, course=instance.course)
#         modules = Module.objects.filter(course=instance.course)
#         tasks = ModuleTasks.objects.all()
#         for module in modules:
#             tasks.filter(module=module)
#         for task in usertasks:
#             if u
#     except Exception:
#         pass

class Answer(models.Model):
    usertask = models.ForeignKey(UserTasks, on_delete=CASCADE, related_name="usertasks")
    number = models.PositiveIntegerField()
    answer = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)
    date_init = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey(Item, on_delete=PROTECT, blank=True)

@receiver(pre_save, sender = Answer)
def check_correctness_usertasks(sender, instance, **kwargs):
    try:
        usertask = UserTasks.objects.get(id = instance.usertask)
        questions = Question.objects.filter(item = instance.item)
        for question in questions:
            if question.number == instance.ans_number:
                if question.answer == instance.answer:
                    instance.is_correct = True
        usertask.is_complete = True
        usertask.correctness = usertask.correctness + (1/len(questions))*100
        usertask.save()
        print('check_correctness_usertasks is_work')
    except Exception:
        pass