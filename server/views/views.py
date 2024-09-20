from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Proba1


@api_view(['GET'])
def getRoutes(req):
    data = [
        {
            'id': proba1.id,
            'body': proba1.body,
            'created': proba1.created.isoformat(),
            'updated': proba1.update.isoformat(),
        }
        for proba1 in Proba1.objects.all().order_by('-created')
    ]
    
    return Response(data)



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

