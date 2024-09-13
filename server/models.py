from django.db import models

class Proba1(models.Model):
    update = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.body[0:50]

# Create your models here.
