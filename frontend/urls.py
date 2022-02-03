from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name=''),
    path('taskCatalog', index),
    path('courseCatalog', index),
]