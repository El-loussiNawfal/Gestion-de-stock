from django.db import models
from orders.models import Order  
from products.models import Product 


class Supplier(models.Model):
    name = models.CharField(max_length=255)
    products_supplied = models.ManyToManyField(Product, related_name='suppliers')  # Many-to-Many relationship with Product
    

    def __str__(self):
        return self.name


    @property
    def NameOfTheproductsSupplied(self):
        Products_names=[product.name for product in self.products_supplied.all()]
        return Products_names
