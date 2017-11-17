from django.conf.urls import url, include
from rest_framework import routers
from .views import QrcodeViewSet


router = routers.SimpleRouter()
router.register(r'qrcodes', QrcodeViewSet)

urlpatterns = router.urls
