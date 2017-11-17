from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Qrcode
from .serializers import QrcodeSerializer


class QrcodeList(APIView):
    def get(self, _):
        qrcodes = Qrcode.objects.all()
        serializer = QrcodeSerializer(qrcodes, many=True)
        return Response(serializer.data)

    def post(self):
        pass


class QrcodeDetail(APIView):
    def get_data(self, id):
        try:
            return Qrcode.objects.get(id=id)
        except Qrcode.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        qrcode = self.get_data(id)
        qrcode = QrcodeSerializer(qrcode)
        return Response(qrcode.data)
