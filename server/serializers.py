from django.db.models import fields
from rest_framework import serializers
from .models import RecipePost


class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = RecipePost
        fields = "__all__"

