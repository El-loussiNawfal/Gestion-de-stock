from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import NoteSerializer
from base.models import Note
from rest_framework import generics,filters
from rest_framework.permissions import IsAuthenticated 


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)  #create the token for the user 
        # Add custom claims
        token['username'] = user.username #add the username to the token 
        # ...
        return token
    




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user=request.user  #get the user from the request
    notes=user.note_set.all()   #get only the notes from the exact user
    serializer=NoteSerializer(notes,many=True)    
    return Response(serializer.data)






@api_view(['GET'])
def getNote(request,pk):
    note=Note.objects.get(id=pk)
    serializer=NoteSerializer(note,many=False) #many for multiple objets
    return Response(serializer.data)



class GetNotes(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['body']

#class AllOrders(generics.RetrieveUpdateDestroyAPIView):
 #   queryset=Order.objects.all()
  #  serializer_class=OrderSerializer




class CreateNote(generics.CreateAPIView):
     queryset = Note.objects.all()
     serializer_class = NoteSerializer



class ModifyNote(generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DeleteNote(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
