from rest_framework import serializers
from .models import Qrcode


class QrcodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Qrcode
        fields = '__all__'
