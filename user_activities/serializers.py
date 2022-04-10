from dataclasses import field
from rest_framework import serializers
from .models import *
from course.serializers import CourseForUserCoursesSerializer


class UserCoursesSerialezer(serializers.ModelSerializer):
    count_of_complete_tasks = serializers.IntegerField()
    # count_of_complete_modules = serializers.IntegerField()
    count_of_tasks = serializers.IntegerField()
    # count_of_modules = serializers.IntegerField()

    class Meta:
        model = UserCourses
        fields = ['count_of_tasks', 'count_of_complete_tasks',
                  'course', 'date_init', 'date_close']


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('id', 'number', 'answer', 'date_init', 'is_correct', 'item')


class UserTasksSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = UserTasks
        fields = ('id', 'task', 'date_init', 'time',
                  'correctness', 'is_complete', 'answers')


class UserTasksCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserTasks
        fields = ('task', 'time', 'usercourse')


class UserDailySerializer(serializers.ModelSerializer):

    class Meta:
        model = UserDaily
        fields = '__all__'


class UserCourseSerializer(serializers.ModelSerializer):
    count_of_complete_tasks = serializers.IntegerField()
    count_of_tasks = serializers.IntegerField()
    count_of_modules = serializers.IntegerField()
    course = CourseForUserCoursesSerializer()
    usertasks = UserTasksSerializer(many=True)

    class Meta:
        model = UserCourses
        fields = ['id', 'usertasks', 'count_of_modules', 'count_of_tasks',
                  'count_of_complete_tasks', 'course', 'date_init', 'date_close']


class CreateUserCoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserCourses
        fields = '__all__'
