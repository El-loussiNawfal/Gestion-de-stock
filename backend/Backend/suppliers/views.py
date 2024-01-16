from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics,filters
# Create your views here.


@api_view(['GET'])
def getSupplier(request,pk):
    supplier=Supplier.objects.get(id=pk)
    serializer=SupplierSerializer(supplier,many=False) #many for multiple objets
    return Response(serializer.data)



class GetSuppliers(generics.ListAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class CreateSupplier(generics.CreateAPIView):
     queryset = Supplier.objects.all()
     serializer_class = SupplierSerializer



class ModifySupplier(generics.UpdateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


class DeleteSupplier(generics.DestroyAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


