from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('<int:user>/courses', UserCoursesView.as_view()),
    path('<int:user>/<int:course>', UserCourseRetrieveView.as_view()),
    path('usercourses/new', UserCoursesCreateView.as_view()),
]