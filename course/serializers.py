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

class CourseWithModules(CourseSerializer):
    # modules = serializers.StringRelatedField(many=True)
    modules = ModuleSerializer(many = True)

class TaskSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    theme = serializers.StringRelatedField()
    
    class Meta:
        model = Task
        fields = "__all__"


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


class ItemSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Item
        fields = "__all__"


class TaskWithItems(TaskSerializer):
    items = ItemSerializer(many=True)


class ModuleWithTasksSerializer(ModuleSerializer):
    task = TaskWithItems(many=True)