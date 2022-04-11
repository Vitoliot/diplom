from rest_framework import serializers
from sympy import true
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


class TaskSerializerForTaskChoicePage(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    theme = serializers.StringRelatedField()
    method = serializers.StringRelatedField()
    have_test = serializers.StringRelatedField()
    test_prop = serializers.StringRelatedField()
    target = serializers.StringRelatedField()
    target_audience = serializers.StringRelatedField()
    rsp = serializers.StringRelatedField()
    token = serializers.StringRelatedField()
    isOnSite = serializers.BooleanField()

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
        fields = ('number', 'task',)


class ModuleWithTasksSerializer(ModuleSerializer):
    moduletasks = ModuleTasksSerializer(many=True)

    class Meta:
        model = Module
        # fields = ('number', 'title', 'overview', 'moduletasks',)
        fields = "__all__"


class CourseWithModules(CourseSerializer):
    # modules = serializers.StringRelatedField(many=True)
    modules = ModuleWithTasksSerializer(many=True)


class TaskThemeSerializerForTaskChoice(serializers.ModelSerializer):
    theme_choices = serializers.ChoiceField(choices=TaskTheme.theme_choices)

    class Meta:
        model = TaskTheme
        fields = ('theme_choices',)


class TaskTypeSerializerForTaskChoice(serializers.ModelSerializer):
    type_choices = serializers.ChoiceField(choices=TaskType.type_choices)

    class Meta:
        model = TaskType
        fields = ('type_choices',)


class TaskMethodOfLearningSerializer(serializers.ModelSerializer):
    methods_of_learning_choices = serializers.ChoiceField(
        choices=TaskMethodOfLearning.methods_of_learning_choices)

    class Meta:
        model = TaskMethodOfLearning
        fields = ('methods_of_learning_choices',)


class TaskDoHaveTestSerializer(serializers.ModelSerializer):
    do_have_test_choices = serializers.ChoiceField(
        TaskDoHaveTest.do_have_test_choices)

    class Meta:
        model = TaskDoHaveTest
        fields = ('do_have_test_choices',)


class TaskTestPropertiesSerializer(serializers.ModelSerializer):
    test_property_choices = serializers.ChoiceField(
        choices=TaskTestProperties.test_property_choices)

    class Meta:
        model = TaskTestProperties
        fields = ('test_property_choices',)


class TaskTargetSerializer(serializers.ModelSerializer):
    target_choices = serializers.ChoiceField(choices=TaskTarget.target_choices)

    class Meta:
        model = TaskTarget
        fields = ('target_choices',)


class TaskRSPSerializer(serializers.ModelSerializer):
    rsp_choices = serializers.ChoiceField(choices=TaskRSP.rsp_choices)

    class Meta:
        model = TaskRSP
        fields = ('rsp_choices',)


class TaskTokenSerializer(serializers.ModelSerializer):
    token_choices = serializers.ChoiceField(choices=TaskToken.token_choices)

    class Meta:
        model = TaskToken
        fields = ('token_choices',)


class TaskTargetAudienceSerializer(serializers.ModelSerializer):
    target_audience_choices = serializers.ChoiceField(
        choices=TaskTargetAudience.target_audience_choices)

    class Meta:
        model = TaskTargetAudience
        fields = ('target_audience_choices',)


class TaskThemeSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True)

    class Meta:
        model = TaskTheme
        fields = ('theme', 'task',)


class TaskTypeSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True)

    class Meta:
        model = TaskType
        fields = ('type', 'task',)


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = "__all__"


class QuestionForUserCoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'question', 'number', 'answer',
                  'posible_answer_1', 'posible_answer_2', 'posible_answer_3',)


class ItemSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Item
        fields = "__all__"


class ItemForUserCoursesSerializer(serializers.ModelSerializer):
    questions = QuestionForUserCoursesSerializer(many=True)

    class Meta:
        model = Item
        fields = ('id', 'questions', 'content', 'title',)


class TaskWithItems(TaskSerializer):
    items = ItemForUserCoursesSerializer(many=True)

    class Meta:
        model = Task
        fields = ('id', 'type', 'theme', 'items', 'title', 'overview',)


class ModuleTasksForUserCoursesSerializer(serializers.ModelSerializer):
    task = TaskWithItems()

    class Meta:
        model = ModuleTasks
        fields = ('number', 'task',)


class ModuleForUserCoursesSerializer(ModuleSerializer):
    moduletasks = ModuleTasksForUserCoursesSerializer(many=True)


class CourseForUserCoursesSerializer(serializers.ModelSerializer):
    modules = ModuleForUserCoursesSerializer(many=True)

    class Meta:
        model = Course
        fields = "__all__"
