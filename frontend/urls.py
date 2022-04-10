from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name=''),
    path('taskCatalog', index),
    path('courseCatalog', index),
    path('login', index),
    path('profile', index),
    path('course', index),
    path('exercise', index),
    path('params', index),
]
