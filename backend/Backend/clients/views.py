from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from rest_framework import generics,filters
from rest_framework.response import Response 
# Create your views here.

@api_view(['GET'])
def getClients():
    client=Client.objects.all()
    serializer=ClientSerializer(client,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getClient(request,pk):
    client=Client.objects.get(idclient=pk)
    serializer=ClientSerializer(client,many=False) #many for multiple objets
    return Response(serializer.data)



class GetClients(generics.ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name','last_name','phone_number','email']

#class AllOrders(generics.RetrieveUpdateDestroyAPIView):
 #   queryset=Order.objects.all()
  #  serializer_class=OrderSerializer




class CreateClient(generics.CreateAPIView):
     queryset = Client.objects.all()
     serializer_class = ClientSerializer



class ModifyClient(generics.UpdateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class DeleteClient(generics.DestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


