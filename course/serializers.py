from rest_framework import serializers
from .models import *


class CourseSerializer(serializers.ModelSerializer):
    count_of_modules = serializers.IntegerField()
    count_of_tasks = serializers.IntegerField()

    class Meta:
        model = Course
        fields = "__all__"


class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Module
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    theme = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = "__all__"


class TaskforModuleSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    theme = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = ("id", "type", "theme", "title", "overview")


class ModuleTasksSerializer(serializers.ModelSerializer):
    task = TaskforModuleSerializer()

    class Meta:
        model = ModuleTasks
        fields = ('number', 'task')


class ModuleWithTasksSerializer(ModuleSerializer):
    moduletasks = ModuleTasksSerializer(many=True)

    class Meta:
        model = Module
        # fields = ('number', 'title', 'overview', 'moduletasks')
        fields = "__all__"


class CourseWithModules(CourseSerializer):
    # modules = serializers.StringRelatedField(many=True)
    modules = ModuleWithTasksSerializer(many=True)


class TaskThemeSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True)

    class Meta:
        model = TaskTheme
        fields = ('theme', 'task')


class TaskTypeSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True)

    class Meta:
        model = TaskType
        fields = ('type', 'task')


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = "__all__"


class QuestionForUserCoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'question', 'number', 'answer',
                  'posible_answer_1', 'posible_answer_2', 'posible_answer_3')


class ItemSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Item
        fields = "__all__"


class ItemForUserCoursesSerializer(serializers.ModelSerializer):
    questions = QuestionForUserCoursesSerializer(many=True)

    class Meta:
        model = Item
        fields = ('id', 'questions', 'content', 'title')


class TaskWithItems(TaskSerializer):
    items = ItemForUserCoursesSerializer(many=True)

    class Meta:
        model = Task
        fields = ('id', 'type', 'theme', 'items', 'title', 'overview')


class ModuleTasksForUserCoursesSerializer(serializers.ModelSerializer):
    task = TaskWithItems()

    class Meta:
        model = ModuleTasks
        fields = ('number', 'task')


class ModuleForUserCoursesSerializer(ModuleSerializer):
    moduletasks = ModuleTasksForUserCoursesSerializer(many=True)


class CourseForUserCoursesSerializer(serializers.ModelSerializer):
    modules = ModuleForUserCoursesSerializer(many=True)

    class Meta:
        model = Course
        fields = "__all__"
