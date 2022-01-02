from rest_framework import serializers
from .models import *


class BOFISerializer(serializers.ModelSerializer):

    class Meta:
        model = BOFI
        fields = "__all__"

class MemorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Memory
        fields = "__all__"


class AASerializer(serializers.ModelSerializer):

    class Meta:
        model = AA
        fields = "__all__"


class QERSerializer(serializers.ModelSerializer):

    class Meta:
        model = QER
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta(serializers.ModelSerializer):
        model = User
        fields = ('username', 'firstname', 'lastname', 'email', 'icon', 'taskinday')

class UserwithParamsSerializer(serializers.ModelSerializer):
    BOFI = BOFISerializer(many=True)
    Memory = MemorySerializer(many=True)
    AA = AASerializer(many=True)
    QER = QERSerializer(many=True)