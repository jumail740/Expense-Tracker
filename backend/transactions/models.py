from django.db import models
from accounts.models import CustomUser
# Create your models here.
class Transactions(models.Model):
    Transaction_Types=(
        ('income', 'Income'),
        ('expense', 'Expense')
    )
    Category_Choices=(
        ('food', 'Food'),
        ('travel', 'Travel'),
        ('shopping', 'Shopping'),
        ('salary', 'Salary'),
        ('health', 'Health'),
        ('other', 'Other'),   
    )
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    type=models.CharField(max_length=10,choices=Transaction_Types)
    category=models.CharField(max_length=20,choices=Category_Choices)
    date=models.DateField()
    description=models.TextField(blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.type} - {self.amount}"