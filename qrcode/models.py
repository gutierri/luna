from django.db import models


class Qrcode(models.Model):
    device = models.CharField(max_length=20)
    data = models.CharField(max_length=42)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
