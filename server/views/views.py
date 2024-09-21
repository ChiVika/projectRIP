from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework.views import APIView
from ..serializers import PostSerializers

from ..models import Proba1, RecipePost




#получение и=всего и пост
class PostsViews(APIView):
    def get(self, request):
        datas = RecipePost.objects.all()
        serializers = PostSerializers(datas, many=True)
        return Response(serializers.data)
    
    def post(self,request):
        serializer = PostSerializers(data=request.data)
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
    

def proba1_list(request):
    data = [
        {
            'id': proba1.id,
            'body': proba1.body,
            'created': proba1.created.isoformat(),
            'updated': proba1.update.isoformat(),
        }
        for proba1 in Proba1.objects.all().order_by('-created')
    ]
    return JsonResponse(data, safe=False)



