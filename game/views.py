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
        user_cell_vertical = int(request.data.get('cell_index').split(',')[0])
        user_cell_horizontal = int(request.data.get('cell_index').split(',')[-1])
        matrix1 = str(request.data.get('matrix'))
        text = f'vertical: {user_cell_vertical}, horisontal: {user_cell_horizontal}'

        print(matrix1)
        print(text)
        
        data['data_cell'] = json.dumps(text)
        return Response(data=data, status=201)     