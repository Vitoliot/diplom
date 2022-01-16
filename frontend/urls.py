from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('taskCatalog', index),
    path('courseCatalog', index),
]