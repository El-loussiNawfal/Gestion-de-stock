from django.db import models
from products.models import Product
from clients.models import *


class Order(models.Model):
  
    name=models.CharField(max_length =255,default="...")
    client = models.ForeignKey(Client, on_delete=models.CASCADE,default=1)  # Link the order to a client
    products = models.ManyToManyField(Product, through='OrderItem')
    order_date = models.DateTimeField(auto_now_add=True)
   


    @property
    def total_price(self):
        # Calculate the total price based on the sum of OrderItem total prices
        return sum(order_item.total_price for order_item in self.orderitem_set.all())

    @property
    def FullNameofTheClient(self):
        return self.client.first_name +"    "+self.client.last_name

    @property
    def NameOfTheProducts(self):
        product_names = [product.name for product in self.products.all()]
        return product_names




class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order #{self.order.id}"
    @property
    def total_price(self):
        # Calculate the total price based on quantity and product price
        return self.quantity * self.product.price
    @property
    def FullNameofTheProduct(self):
        return self.product.name
    

    @property
    def NameOfTheOrder(self):
        return self.order.name