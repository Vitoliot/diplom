from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from .models import *


class BOFICreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = BOFI
        fields = ['user', 'value']


class VMCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = VM
        fields = ['user', 'value']


class VMWPCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = VMWP
        fields = ['user', 'value']


class LMCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = LM
        fields = ['user', 'value']


class AACreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = AA
        fields = ['user', 'value']


class QERCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = QER
        fields = ['user', 'value', "WPM", "QU"]


class BOFISerializer(serializers.ModelSerializer):

    class Meta:
        model = BOFI
        fields = ['date_init', 'value']


class VMSerializer(serializers.ModelSerializer):

    class Meta:
        model = VM
        fields = ['date_init', 'value']


class VMWPSerializer(serializers.ModelSerializer):

    class Meta:
        model = VMWP
        fields = ['date_init', 'value']


class LMSerializer(serializers.ModelSerializer):

    class Meta:
        model = LM
        fields = ['date_init', 'value']


class AASerializer(serializers.ModelSerializer):

    class Meta:
        model = AA
        fields = ['date_init', 'value']


class QERSerializer(serializers.ModelSerializer):

    class Meta:
        model = QER
        fields = ['date_init', 'value', "WPM", "QU"]


class UserSerializer(serializers.ModelSerializer):

    class Meta(serializers.ModelSerializer):
        model = User
        fields = ['username', 'first_name',
                  'last_name', 'email', 'icon', 'task_in_day']
        # validators = None


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name',
                  'last_name', 'email', 'task_in_day']


class UserIconUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['icon']


class MyUserCreateSerializer(UserCreateSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name',
                  'last_name', 'email', 'task_in_day']


class UserwithParamsSerializer(UserSerializer):
    BOFI = BOFISerializer(many=True)
    VM = VMSerializer(many=True)
    VMWP = VMWPSerializer(many=True)
    LM = LMSerializer(many=True)
    AA = AASerializer(many=True)
    QER = QERSerializer(many=True)

    class Meta(UserSerializer.Meta):
        fields = ["BOFI", "VM", "VMWP", "LM", "AA", "QER"]
