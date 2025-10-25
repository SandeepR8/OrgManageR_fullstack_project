from rest_framework import generics
from .models import Organization, User
from .serializers import OrganizationSerializer, UserSerializer


class OrganizationListView(generics.ListCreateAPIView):
    queryset = Organization.objects.all().order_by('Organization_name')
    serializer_class = OrganizationSerializer


class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    lookup_field = 'slug'


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('name')
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
