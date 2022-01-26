from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions, authentication
from rest_framework.filters import OrderingFilter
from django.db.models import Count, Case, When, Exists

class UserCoursesView(generics.ListAPIView):
    # queryset = UserCourses.objects.all()
    queryset = UserCourses.objects.all().annotate(
        count_of_complete_tasks = Count(Case(When(usertasks__is_complete=True, then=1))),
        count_of_tasks = Count('course__modules__moduletasks'),
    )
    lookup_field = 'user'
    serializer_class = UserCoursesSerialezer
    permission_classes = []
    authentication_classes = []


class UserCoursesCreateView(generics.CreateAPIView):
    queryset = UserCourses.objects.all()
    serializer_class = CreateUserCoursesSerializer
    permission_classes = []
    authentication_classes = []