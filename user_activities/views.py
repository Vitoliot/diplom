from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions, authentication
from rest_framework_simplejwt import authentication
from diplom.permissions import IsOwner
from rest_framework.filters import OrderingFilter
from django.db.models import Count, Case, When

class UserCoursesView(generics.ListAPIView):
    queryset = UserCourses.objects.all().annotate(
        count_of_complete_tasks = Count(Case(When(usertasks__is_complete=True, then=1))),
        count_of_tasks = Count('course__modules__moduletasks'),
    )
    lookup_field = 'user'
    serializer_class = UserCoursesSerialezer
    # permission_classes = [permissions.IsAdminUser]
    # permission_classes = [permissions.OR(permissions.AND(permissions.IsAuthenticated, IsOwner), permissions.IsAdminUser)]
    permission_classes = [(permissions.IsAuthenticated & IsOwner) | permissions.IsAdminUser]
    authentication_classes = []


class UserCourseRetrieveView(generics.RetrieveDestroyAPIView):
    queryset = UserCourses.objects.all().annotate(
        count_of_complete_tasks = Count(Case(When(usertasks__is_complete=True, then=1))),
        count_of_modules = Count('course__modules'),
        count_of_tasks = Count('course__modules__moduletasks')
    )
    lookup_url_kwarg= ['user', 'course']
    serializer_class = UserCourseSerializer
    permission_classes = [(permissions.IsAuthenticated & IsOwner) | permissions.IsAdminUser]
    # authentication_classes = [authentication.JWTTokenUserAuthentication]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        for kwarg in lookup_url_kwarg:
            assert kwarg in self.kwargs, (
                (self.__class__.__name__, lookup_url_kwarg)
            )

        filter_kwargs = {kwarg : self.kwargs[kwarg] for kwarg in lookup_url_kwarg}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj

class UserCoursesCreateView(generics.CreateAPIView):
    queryset = UserCourses.objects.all()
    serializer_class = CreateUserCoursesSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = []