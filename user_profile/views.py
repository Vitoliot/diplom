from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions, authentication

# Create your views here.
class UserOneView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserwithParamsSerializer
    permission_classes = []
    authentication_classes = []

class UserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
    authentication_classes = []

class BOFICreateView(generics.CreateAPIView):
    queryset = BOFI.objects.all()
    serializer_class = BOFISerializer
    permission_classes = []
    authentication_classes = []


class MemoryCreateView(generics.CreateAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer
    permission_classes = []
    authentication_classes = []


class AACreateView(generics.CreateAPIView):
    queryset = AA.objects.all()
    serializer_class = AASerializer
    permission_classes = []
    authentication_classes = []


class QERCreateView(generics.CreateAPIView):
    queryset = QER.objects.all()
    serializer_class = QERSerializer
    permission_classes = []
    authentication_classes = []

