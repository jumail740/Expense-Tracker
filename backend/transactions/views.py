from django.shortcuts import render
from rest_framework import viewsets
from .models import Transactions
from .serializers import TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminUserRole
from django.db.models import Sum
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.response import Response
from accounts.models import CustomUser

# Create your views here.

class TransactionViewSet(viewsets.ModelViewSet):
    
    serializer_class=TransactionSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        return Transactions.objects.filter(user=self.request.user).order_by('-id')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False,methods=['get'])
    def total_income(self,request):
        
        income=Transactions.objects.filter(
            user=request.user,type='income'
            ).aggregate(total=Sum('amount'))
        
        return Response({
            "total_income":income['total'] or 0
        })
        
    @action(detail=False,methods=['get'])
    def total_expense(self,request):
        
        expense=Transactions.objects.filter(
            user=request.user,type='expense'
            ).aggregate(total=Sum('amount'))
        
        return Response({
            "total_expense":expense['total'] or 0
        })
         
    @action(detail=False, methods=['get'])
    def balance(self, request):

        income = Transactions.objects.filter(
            user=request.user,
            type='income'
        ).aggregate(total=Sum('amount'))

        expense = Transactions.objects.filter(
            user=request.user,
            type='expense'
        ).aggregate(total=Sum('amount'))
        
        total_income = income['total'] or 0
        total_expense = expense['total'] or 0

        return Response({
            "total_income": total_income,
            "total_expense": total_expense,
            "balance": total_income - total_expense
        })
        
    @action(detail=False, methods=['get'])
    def category_breakdown(self, request):

        data = (
            Transactions.objects
            .filter(
                user=request.user
                # type='expense'
            )
            # .values('category')
            .values('category', 'type')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )

        return Response(data)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUserRole])
def all_users(request):
    
    users=CustomUser.objects.all().values(
        'id',
        'username',
        'email',
        'role'
    )
    return Response(users)


@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUserRole])
def all_transactions(request):
    
    transactions=Transactions.objects.all()
    
    serializer=TransactionSerializer(transactions,many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUserRole])
def filter_transactions(request):

    category = request.GET.get('category')

    transactions = Transactions.objects.filter(category=category)

    serializer = TransactionSerializer(transactions, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def transaction_choices(request):

    return Response({
        "types": Transactions.Transaction_Types,
        "categories": Transactions.Category_Choices
    })