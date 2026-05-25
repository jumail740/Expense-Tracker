from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet
from django.urls import path
from transactions import views

router=DefaultRouter()
router.register('transactions', TransactionViewSet, basename='transactions')
urlpatterns = router.urls

urlpatterns += [
    path('admin/users/',views.all_users),
    path('admin/transactions/',views.all_transactions),
    path('admin/filter/',views.filter_transactions),
    path( 'choices/',views.transaction_choices),
]