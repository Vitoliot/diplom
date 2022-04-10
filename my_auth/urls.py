from django.urls import path
from .views import *


urlpatterns = [
    path('jwt/logout', LogoutView.as_view(), name='auth_logout'),
]

