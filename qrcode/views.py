from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, mixins
from .models import Qrcode
from .serializers import QrcodeSerializer


class QrcodeViewSet(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    queryset = Qrcode.objects.all()
    serializer_class = QrcodeSerializer
