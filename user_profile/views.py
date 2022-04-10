from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions, authentication
from rest_framework_simplejwt import authentication
from diplom.permissions import IsOwner


class UserOneView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserwithParamsSerializer
    # permission_classes = [(permissions.IsAuthenticatedOrReadOnly) or permissions.IsAdminUser]
    authentication_classes = []


class UserRetrieveDeleteView(generics.RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    # authentication_classes = [authentication.JWTAuthentication]


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    # authentication_classes = [authentication.JWTAuthentication]


class UserIconUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserIconUpdateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    # authentication_classes = [authentication.JWTAuthentication]


class BOFICreateView(generics.CreateAPIView):
    queryset = BOFI.objects.all()
    serializer_class = BOFICreateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    authentication_classes = []


class VMCreateView(generics.CreateAPIView):
    queryset = VM.objects.all()
    serializer_class = VMCreateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    authentication_classes = []


class VMWPCreateView(generics.CreateAPIView):
    queryset = VMWP.objects.all()
    serializer_class = VMWPCreateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    authentication_classes = []


class LMCreateView(generics.CreateAPIView):
    queryset = LM.objects.all()
    serializer_class = LMCreateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    authentication_classes = []


class AACreateView(generics.CreateAPIView):
    queryset = AA.objects.all()
    serializer_class = AACreateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    authentication_classes = []


class QERCreateView(generics.CreateAPIView):
    queryset = QER.objects.all()
    serializer_class = QERCreateSerializer
    # permission_classes = [(permissions.IsAuthenticated and
    #                        IsOwner) or permissions.IsAdminUser]
    authentication_classes = []
