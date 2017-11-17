from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Qrcode
from .serializers import QrcodeSerializer


class QrcodeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Qrcode.objects.all()
    serializer_class = QrcodeSerializer
