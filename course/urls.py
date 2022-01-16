from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path("course/new", CourseAddView.as_view()),
    path("course/all", CourseListView.as_view()),
    path("course/update/<int:pk>", CourseUpdateView.as_view()),
    path("course/<int:pk>", CourseWithModules.as_view()),
    path("module/new", ModuleAddView.as_view()),
    path("module/<int:pk>", ModuleOneView.as_view()),
    path("module/update/<int:pk>", ModuleUpdateDeleteView.as_view()),
    path("question/new", QuestionCreateView.as_view()),
    path("question/<int:pk>", QuestionOneView.as_view()),
    path("task/<int:pk>", TaskwithItemsOneView.as_view()),
    path("task/update/<int:pk>", TaskUpdateDestroyView.as_view()),
    path("task/new", TaskCreateView.as_view()),
    path("task/all/type", TaskTypeView.as_view()),
    path("task/all/theme", TaskThemeView.as_view()),
    path("task/all", TaskListView.as_view()),
    path("task_wi/<int:pk>", TaskOneView.as_view()),
    path("item/new", ItemCreateView.as_view()),
    path("item/<int:pk>", ItemOneView.as_view()),
]