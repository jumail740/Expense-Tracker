from rest_framework import serializers
from .models import Transactions

class TransactionSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    class Meta:

        model = Transactions

        fields = [
            'id',
            'amount',
            'type',
            'category',
            'date',
            'description',
            'created_at',
            'user',
            'username'
        ]

        read_only_fields = ['user']