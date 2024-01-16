"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.urls import path
from . import views
from products.serializers import *
from products.models import *
from products.views import *
from orders.views import *

from orders.views import *

from clients.views import *
from suppliers.views import *

urlpatterns = [
    
    path('token', MyTokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    
    
    
    path('notes',GetNotes.as_view()),
    path('notes/<str:pk>/',getNote),
    path('notes/<str:pk>/update/', ModifyNote.as_view()),
    path('notes/<str:pk>/delete/', DeleteNote.as_view()),
    path('notes/create', CreateNote.as_view()),



    
    #products routes
    path('products',ListProducts.as_view()),
    path('products/<str:pk>/', getProduct),
    path('product/<str:pk>/update/', ModifyProducts.as_view()),
    path('product/<str:pk>/delete/', DeleteProducts.as_view()),
    path('product/create/', CreateProducts.as_view(queryset=Product.objects.all(), serializer_class=ProductSerializer)),


    #orders routes
    #path('AllOrders/<str:pk>/',AllOrders.as_view())
    path('orders',GetOrders.as_view()),
    path('order/<str:pk>/',getOrder),
    path('order/<str:pk>/update/', ModifyOrder.as_view()),
    path('order/<str:pk>/delete/', DeleteOrder.as_view()),
    path('order/create', CreateOrder.as_view()),
    path('orderdetails/<str:pk>', GetOrderItemFromOrder),


    #orderitems
    path('orderitems',GetOrderItems.as_view()),
     path('orderitem/<str:pk>/', getOrderItem),
    path('orderitem/<str:pk>/update/', ModifyOrderItem.as_view()),
    path('orderitem/<str:pk>/delete/', DeleteOrderItem.as_view()),
    path('orderitem/create', CreateOrderItem.as_view()),

    #clients
    path('Clients',GetClients.as_view()),
     path('Client/<str:pk>/', getClient),
    path('Client/<str:pk>/update/', ModifyClient.as_view()),
    path('Client/<str:pk>/delete/', DeleteClient.as_view()),
    path('Client/create', CreateClient.as_view()),

    #suplliers
     path('suppliers',GetSuppliers.as_view()),
     path('supplier/<str:pk>/', getSupplier),
    path('supplier/<str:pk>/update/', ModifySupplier.as_view()),
    path('supplier/<str:pk>/delete/',DeleteSupplier.as_view()),
    path('supplier/create', CreateSupplier.as_view())


]

