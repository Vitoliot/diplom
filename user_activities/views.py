from re import T
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions
from diplom.permissions import IsOwner
from django.db.models import Count, Case, When


class UserCoursesView(generics.ListAPIView):
    queryset = UserCourses.objects.all().annotate(
        count_of_complete_tasks=Count(
            Case(When(usertasks__is_complete=True, then=1)), distinct=True),
        count_of_tasks=Count('course__modules__moduletasks'),
    )
    lookup_field = 'user'
    serializer_class = UserCoursesSerialezer
    # permission_classes = [permissions.IsAdminUser]
    # permission_classes = [permissions.OR(permissions.AND(permissions.IsAuthenticated, IsOwner), permissions.IsAdminUser)]
    permission_classes = [
        (permissions.IsAuthenticated and IsOwner) or permissions.IsAdminUser]
    authentication_classes = []


class UserDailyView(generics.RetrieveUpdateAPIView):
    queryset = UserDaily.objects.all()
    lookup_url_kwarg = ['user', 'date_init']
    serializer_class = UserDailySerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        for kwarg in lookup_url_kwarg:
            assert kwarg in self.kwargs, (
                (self.__class__.__name__, lookup_url_kwarg)
            )

        filter_kwargs = {kwarg: self.kwargs[kwarg]
                         for kwarg in lookup_url_kwarg}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj


class UserDailyCreateView(generics.CreateAPIView):
    queryset = UserDaily.objects.all()
    serializer_class = UserDailySerializer


class UserCourseRetrieveView(generics.RetrieveDestroyAPIView):
    queryset = UserCourses.objects.all().annotate(
        count_of_complete_tasks=Count(
            Case(When(usertasks__is_complete=True, then=1)), distinct=True),
        # count_of_complete_tasks=Count('course__modules__moduletasks'),
        count_of_modules=Count('course__modules', distinct=True),
        count_of_tasks=Count('course__modules__moduletasks')
    )
    lookup_url_kwarg = ['user', 'course']
    serializer_class = UserCourseSerializer
    # permission_classes = [
    #     (permissions.IsAuthenticated and IsOwner) or permissions.IsAdminUser]
    # authentication_classes = [authentication.JWTTokenUserAuthentication]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        for kwarg in lookup_url_kwarg:
            assert kwarg in self.kwargs, (
                (self.__class__.__name__, lookup_url_kwarg)
            )

        filter_kwargs = {kwarg: self.kwargs[kwarg]
                         for kwarg in lookup_url_kwarg}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj


class UserCoursesCreateView(generics.CreateAPIView):
    queryset = UserCourses.objects.all()
    serializer_class = CreateUserCoursesSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = []


class UserTasksCreateView(generics.CreateAPIView):
    queryset = UserTasks.objects.all()
    serializer_class = UserTasksCreateSerializer
    # permission_classes = [permissions.IsAuthenticated]
    authentication_classes = []


class AnswerCreateView(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = []

class AnswerDeleteView(generics.DestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = []
