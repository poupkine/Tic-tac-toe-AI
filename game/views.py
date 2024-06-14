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
        input_data_kr = float(request.data.get('valueKr'))
        input_data_m2 = float(request.data.get('valueM2'))
        #with open('static/assets/gdp.csv', 'r') as f:
            #reader = csv.reader(f)
            #temp_dict = {}
            #final_list = []
            #for number, rows in enumerate(reader):
                #row = rows[0].split(';')
                ##print(row, number)
                #if number == 0:
                    #continue
                #else:
                    #row_data =  float(row[1])
                    ##print(row_data)
                    #temp_dict = {'date': row[0], "value": float(row_data)}
                    #last_year =  int(row[0])
                    #final_list.append(temp_dict)
        #with open('static/assets/model_gdp.pkl', 'rb') as f:
            #clf2 = pickle.load(f)
        
        #prediction = clf2.predict([[input_data_kr]])
        #temp_dict = {'date': str(last_year + 1), "value": str(prediction[0,0])}
        #final_list.append(temp_dict)
        ##print(final_list)
        
        #data['data_gdp'] = json.dumps(final_list)
        with open('static/assets/cpi.csv', 'r') as f:
            reader = csv.reader(f)
            temp_dict = {}
            final_list = []
            for number, rows in enumerate(reader):
                row = rows[0].split(';')
                #print(row, number)
                if number == 0:
                    continue
                else:
                    row_data =  float(row[1])
                    #print(row_data)
                    temp_dict = {'date': row[0], "value": float(row_data)}
                    last_year =  int(row[0])
                    final_list.append(temp_dict)
        with open('static/assets/model_cpi_m.pkl', 'rb') as f:
            clf2 = pickle.load(f)
        prediction = clf2.predict([[input_data_kr, input_data_m2]])
        temp_dict = {'date': str(last_year + 1), "value": str(prediction[0,0])}
        final_list.append(temp_dict)
        #print(final_list)
        
        data['data_cpi'] = json.dumps(final_list)   
        return Response(data=data, status=201)     