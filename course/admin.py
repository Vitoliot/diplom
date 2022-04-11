from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Course)
admin.site.register(Module)
admin.site.register(ModuleTasks)
admin.site.register(Item)
admin.site.register(Task)
admin.site.register(TaskType)
admin.site.register(TaskTheme)
admin.site.register(TaskMethodOfLearning)
admin.site.register(TaskDoHaveTest)
admin.site.register(TaskTestProperties)
admin.site.register(TaskTarget)
admin.site.register(TaskTargetAudience)
admin.site.register(TaskRSP)
admin.site.register(TaskToken)
admin.site.register(Question)