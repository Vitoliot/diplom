from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions, authentication

class CourseOneView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []
    authentication_classes = []


class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []
    authentication_classes = []


class CourseUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []
    authentication_classes = []


class CourseWithModules(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseWithModules
    permission_classes = []
    authentication_classes = []


class CourseAddView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []
    authentication_classes = []


class ModuleAddView(generics.CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleWithTasksSerializer
    permission_classes = []
    authentication_classes = []


class ModuleOneView(generics.RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleWithTasksSerializer
    permission_classes = []
    authentication_classes = []


class ModuleUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleWithTasksSerializer
    permission_classes = []
    authentication_classes = []


class QuestionCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = []
    authentication_classes = []


class QuestionOneView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = []
    authentication_classes = []


class TaskwithItemsOneView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithItems
    permission_classes = []
    authentication_classes = []


class TaskUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithItems
    permission_classes = []
    authentication_classes = []

class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithItems
    permission_classes = []
    authentication_classes = []

class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = []
    authentication_classes = []


class TaskOneView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = []
    authentication_classes = []


class ItemCreateView(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = []
    authentication_classes = []


class ItemOneView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = []
    authentication_classes = []