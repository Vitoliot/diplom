from django.contrib import admin
from django.urls import path
from .views import *


urlpatterns = [
    path('profile/<int:pk>', UserOneView.as_view()),
    path('profile/update/<int:pk>>', UserRetrieveUpdateDeleteView.as_view()),
    path('BOFI/new', BOFICreateView.as_view()),
    path('Memory/new', MemoryCreateView.as_view()),
    path('AA/new', AACreateView.as_view()),
    path('QER/new', QERCreateView.as_view()),
]