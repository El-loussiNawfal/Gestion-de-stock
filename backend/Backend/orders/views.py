from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .serializers import *
from rest_framework import generics
# Create your views here.

from rest_framework import filters



@api_view(['GET'])
def getOrders():
    orders=Order.objects.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getOrder(request,pk):
    order=Order.objects.get(id=pk)
    serializer=OrderSerializer(order,many=False) #many for multiple objets
    return Response(serializer.data)



class GetOrders(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

#class AllOrders(generics.RetrieveUpdateDestroyAPIView):
 #   queryset=Order.objects.all()
  #  serializer_class=OrderSerializer

# to get all the orderitem that belongs to an order
@api_view(['GET'])
def GetOrderItemFromOrder(request,pk):
    order=Order.objects.get(id=pk)
    orderitems=order.orderitem_set.all()
    serializer=OrderItemSerializer(orderitems,many=True)
    return Response(serializer.data)




class CreateOrder(generics.CreateAPIView):
     queryset = Order.objects.all()
     serializer_class = OrderSerializer



class ModifyOrder(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class DeleteOrder(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer



 ###########################################  orderitems methods




@api_view(['GET'])
def getOrderItem(request,pk):
    orderItem=OrderItem.objects.get(id=pk)
    serializer=OrderItemSerializer(orderItem,many=False) #many for multiple objets
    return Response(serializer.data)






class GetOrderItems(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['order__name']


class CreateOrderItem(generics.CreateAPIView):
     queryset = OrderItem.objects.all()
     serializer_class = OrderItemSerializer



class ModifyOrderItem(generics.UpdateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class DeleteOrderItem(generics.DestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer    