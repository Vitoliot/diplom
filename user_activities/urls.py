from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('<int:user>/courses', UserCoursesView.as_view()),
    path('<int:user>/<int:course>', UserCourseRetrieveView.as_view()),
    path('usercourses/new', UserCoursesCreateView.as_view()),
    path('userdaily/new', UserDailyCreateView.as_view()),
    path('userdaily/<int:user>/<slug:date_init>', UserDailyView.as_view()),
    path('deletanswer/<int:pk>', AnswerDeleteView.as_view()),
    path('answer/new', AnswerCreateView.as_view()),
    path('usertask/new', UserTasksCreateView.as_view())
]