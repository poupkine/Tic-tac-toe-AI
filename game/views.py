from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import json
import datetime
import random


def index(request, *args, **kwargs):
    now = datetime.datetime.now().strftime("%d %m %Y, %A %H:%M")
    number = random.randint(1, 1555)
    context = {
        "now": now, 
        "number": number,
    }
    return render(request=request, template_name="game/index.html", context=context, content_type=None, status=None, using=None)


class apiView(APIView):
    def get(self, request):
        data = {}   
        data['data_cpi'] = json.dumps(1)

        return Response(data=data, status=201) 
    
    def post(self, request):
        data = {}
        user_cell = float(request.data.get('cell_index'))
       
        print(user_cell)
        
        data['data_cpi'] = json.dumps(user_cell)
        return Response(data=data, status=201)     