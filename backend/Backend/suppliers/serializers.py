from rest_framework.serializers import ModelSerializer
from .models import *


class SupplierSerializer(ModelSerializer):
    class Meta:
        model=Supplier
        fields = ['id','name','products_supplied','NameOfTheproductsSupplied']
