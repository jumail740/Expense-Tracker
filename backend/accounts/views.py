from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
# Create your views here.

@api_view(['POST'])
def register(request):
    
    serializer=RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message':'User Register Successfully'
            
        })
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    
    username=request.data.get('username')
    password=request.data.get('password')
    
    user= authenticate(username=username, password=password)
    
    if user is not None:
        
        refresh= RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access':str(refresh.access_token),
            'role':user.role
        })
    
