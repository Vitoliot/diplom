from django.contrib import admin
from django.urls import path
from .views import *


urlpatterns = [
    path('profile_params/<int:pk>', UserOneView.as_view()),
    path('profile/<int:pk>', UserRetrieveDeleteView.as_view()),
    path('profile/update/<int:pk>', UserUpdateView.as_view()),
    path('profile/update/icon/<int:pk>', UserIconUpdateView.as_view()),
    path('BOFI/new', BOFICreateView.as_view()),
    path('VM/new', VMCreateView.as_view()),
    path('VMWP/new', VMWPCreateView.as_view()),
    path('LM/new', LMCreateView.as_view()),
    path('AA/new', AACreateView.as_view()),
    path('QER/new', QERCreateView.as_view()),
]