from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers, viewsets, permissions
from rest_framework.views import APIView
from ..serializers import PostSerializers
from rest_framework.exceptions import AuthenticationFailed
from ..models import RecipePost, User
import jwt, datetime




#получение и=всего и пост
class PostsViews(APIView):
    def get(self, request):
        datas = RecipePost.objects.all()
        serializers = PostSerializers(datas, many=True)
        return Response(serializers.data)
    
    def post(self,request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Не аутентифицирован!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Токен истек!')

        user = User.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('Пользователь не найден')
        image = request.FILES.get('image')

        Posts = RecipePost.objects.create(
            user=user,
            title=request.data.get('title'),
            description=request.data.get('description'),
            images=image
        )

        serializer = PostSerializers(Posts, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
class PostViewsId(APIView):
    def get(self, request, ids):
        try:
            data = RecipePost.objects.get(id=ids)
        except RecipePost.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        serializers = PostSerializers(data)
        return Response(serializers.data)
    def put(self,request, ids):
        try:
            data = RecipePost.objects.get(id=ids)
        except RecipePost.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        serializers = PostSerializers(data=request.data, instance=data, partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=400)
    def delete(self, request, ids):
        try:
            data = RecipePost.objects.get(id=ids)
        except RecipePost.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        data.delete()
        return Response(status=200)

class PostViewsAllUser(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Не аутентифицирован!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Токен истек!')

        user = User.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('Пользователь не найден')
        data = RecipePost.objects.filter(user_id=user)
        serializers = PostSerializers(data, many=True)
        return Response(serializers.data)


class PostDatas(viewsets.ModelViewSet):
    queryset = RecipePost.objects.all()
    serializer_class = PostSerializers
