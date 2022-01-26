from rest_framework import serializers
from .models import *

class UserCoursesSerialezer(serializers.ModelSerializer):
    count_of_complete_tasks = serializers.IntegerField()
    # count_of_complete_modules = serializers.IntegerField()
    count_of_tasks = serializers.IntegerField()
    # count_of_modules = serializers.IntegerField()

    class Meta:
        model = UserCourses
        fields = ['count_of_tasks', 'count_of_complete_tasks', 'course', 'date_init', 'date_close']


class CreateUserCoursesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserCourses
        fields = '__all__'