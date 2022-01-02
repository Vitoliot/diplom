from rest_framework import serializers
from .models import *

class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = "__all__"


class ModuleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Module
        fields = "__all__"

class CourseWithModules(CourseSerializer):
    modules = ModuleSerializer(many=True)

class TaskTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TaskType
        fields = "__all__"

class TaskThemeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TaskTheme
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    
    theme = TaskThemeSerializer()
    class Meta:
        model = Task
        fields = "__all__"

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
    tasks = TaskWithItems(many=True)