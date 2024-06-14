from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import json
import datetime
import random
import numpy as np
from itertools import islice
from .game import best_move_game


def index(request, *args, **kwargs):
    now = datetime.datetime.now().strftime("%d %m %Y, %A %H:%M")
    number = random.randint(1, 1555)
    context = {
        "now": now, 
        "number": number,
    }
    return render(request=request, template_name="game/index.html", context=context, content_type=None, status=None, using=None)


class apiView(APIView):
    
    def grouper(self, iterable, n, fillvalue=None):
        args = [iter(iterable)] * n
        return itertools.zip_longest(*args, fillvalue=fillvalue)
    
    
    def get(self, request):
        data = {}  
        data['data_cpi'] = json.dumps(1)

        return Response(data=data, status=201) 
    
    def post(self, request):
        data = {}
        user_cell_vertical = int(request.data.get('cell_index').split(',')[0])
        user_cell_horizontal = int(request.data.get('cell_index').split(',')[-1])
        matrix = request.data.get('matrix')[1:-1].split(",")
        integer_matrix = [int(i) for i in matrix]
        text = f'vertical: {user_cell_vertical}, horisontal: {user_cell_horizontal}'
        matrix_to_numpy_temp = [integer_matrix[i:i+3] for i in range(0, len(integer_matrix), 3)]
        matrix_to_numpy = np.array(matrix_to_numpy_temp).reshape((3, 3))
        best_move = best_move_game(matrix_to_numpy)
        if best_move:
            best_move_vertical = best_move[0]
            best_move_horisontal = best_move[-1]
            new_matrix = matrix_to_numpy
            new_matrix[best_move_vertical][best_move_horisontal] = 2
            new_list = list(new_matrix.flat)
            list_to_frontend = [str(i) for i in new_list]
            data['new_state'] = json.dumps(list_to_frontend)
        else:
            data['new_state'] = json.dumps(False)
        return Response(data=data, status=201)     
