from django.urls import path
from .views import (
    OrganizationListView,
    OrganizationDetailView,
    UserListView,
    UserDetailView
)

urlpatterns = [
    path('organizations/', OrganizationListView.as_view(), name='organization-list'),
    path('organizations/<slug:slug>/', OrganizationDetailView.as_view(), name='organization-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
