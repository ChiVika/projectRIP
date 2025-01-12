from django.db import models
from rest_framework import serializers

# class Proba1(models.Model):
#     update = models.DateTimeField(auto_now=True)
#     created = models.DateTimeField(auto_now_add=True)
#     body = models.TextField(null=True, blank=True)
#
#     def __str__(self):
#         return self.body[0:50]


    

class User(models.Model):
    username = models.TextField(max_length=200)
    email = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=100)

    def check_password(self, raw_password):
        return self.password == raw_password    
    
class RecipePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(max_length=200)
    images = models.ImageField(upload_to="server/static/images",blank=True)
    description = models.TextField(blank=True)
    create_date = models.DateTimeField(auto_now_add=True)


