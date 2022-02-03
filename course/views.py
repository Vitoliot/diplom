from django.shortcuts import render
from django.db.models import Count
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions, authentication
from rest_framework.filters import OrderingFilter

class TaskTypeView(generics.ListAPIView):
    queryset = TaskType.objects.all()
    serializer_class = TaskTypeSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class TaskThemeView(generics.ListAPIView):
    queryset = TaskTheme.objects.all()
    serializer_class = TaskThemeSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class CourseOneView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all().annotate(
        count_of_modules = Count('modules'),
        count_of_tasks = Count('modules__moduletasks')
    )
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    filter_backends = [OrderingFilter]
    ordering_fields = ['date_create', 'title']


class CourseUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []


class CourseWithModules(generics.RetrieveDestroyAPIView):
    queryset = Course.objects.all().annotate(
        count_of_modules = Count('modules'),
        count_of_tasks = Count('modules__moduletasks')
    )
    serializer_class = CourseWithModules
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class CourseAddView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []


class ModuleAddView(generics.CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleWithTasksSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []


class ModuleOneView(generics.RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleWithTasksSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class ModuleUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleWithTasksSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []


class QuestionCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []


class QuestionOneView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class TaskwithItemsOneView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithItems
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class TaskUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithItems
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []

class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithItems
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []

class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class TaskOneView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []


class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = []


class ItemOneView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []