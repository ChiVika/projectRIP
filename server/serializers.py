from django.db.models import fields
from rest_framework import serializers
from .models import RecipePost, User


class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = RecipePost
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwards = {
            'password': {'write_only': True}
        }

    # def create(self, validated_data):
    #     # password = validated_data.pop('password', None)
    #     # instance = self.Meta.model(**validated_data)
    #     # if password is not None:
    #     #     instance.set_password(password)
    #     # instance.save()
    #     # return instance
        def create(self, validated_data):
            user = User.create_user(**validated_data)
            return user