from rest_framework.serializers import ModelSerializer

from .models import *

class OrderSerializer(ModelSerializer):
    class Meta:
        model=Order
        fields = ['id','name', 'client', 'products', 'order_date','total_price','FullNameofTheClient','NameOfTheProducts']




class OrderItemSerializer(ModelSerializer):
    class Meta:
        model=OrderItem
        fields = ['id','order', 'product', 'quantity', 'total_price','FullNameofTheProduct','NameOfTheOrder']