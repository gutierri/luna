from django.db import models


class Qrcode(models.Model):
    device = models.CharField(max_length=90)
    data = models.CharField(max_length=130)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
