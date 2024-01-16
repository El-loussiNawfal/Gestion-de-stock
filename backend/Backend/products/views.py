from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .serializers import *
from rest_framework import generics,filters


@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True) #many for multiple objets
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(idproduct=pk)
    serializer=ProductSerializer(product,many=False) #many for multiple objets
    return Response(serializer.data)


#@api_view(['PUT'])
#def updateProduct(request,pk):
    product=Product.objects.get(idproduct=pk)
    data=request.data
    serializer=ProductSerializer(instance=product,data=data)
    if serializer.is_valid():
         serializer.save() # modify the data of note with the new data from the request
   
    return Response(serializer.data)
 

#@api_view(['DELETE'])
#def deleteProduct(request,pk):
    product=Product.objects.get(idproduct=pk)
    product.delete();
    return Response('Note was deleted')



class ListProducts(generics.ListAPIView):
     queryset = Product.objects.all()
     serializer_class = ProductSerializer
     filter_backends = [filters.SearchFilter]
     search_fields = ['name']



class CreateProducts(generics.CreateAPIView):
     queryset = Product.objects.all()
     serializer_class = ProductSerializer



class ModifyProducts(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class DeleteProducts(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



