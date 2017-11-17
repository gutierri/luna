from django.conf.urls import url, include
from rest_framework import routers
from .views import QrcodeList, QrcodeDetail


urlpatterns = [
    url(r'^qrcodes/$', QrcodeList.as_view()),
    url(r'^qrcodes/(?P<id>[0-9]+)/$', QrcodeDetail.as_view())
]
