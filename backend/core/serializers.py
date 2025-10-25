from rest_framework import serializers
from .models import Organization, User


class UserSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.Organization_name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'role', 'organization','organization_name']
    
    def validate(self, attrs):
        org = attrs.get('organization', getattr(self.instance, 'organization', None))
        role = attrs.get('role', getattr(self.instance, 'role', None))

        if org and role == 'COORDINATOR':
            current_coordinators = org.users.filter(role='COORDINATOR')
            if self.instance:
                current_coordinators = current_coordinators.exclude(id=self.instance.id)
            if current_coordinators.count() >= org.max_coordinators:
                raise serializers.ValidationError(
                    f"Cannot add more coordinators to {org.Organization_name}. Maximum allowed: {org.max_coordinators}."
                )
        return attrs



class OrganizationSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True) 

    class Meta:
        model = Organization
        fields = [
            'id',
            'Organization_name',
            'slug',
            'email',
            'phone_number',
            'website',
            'language',
            'status',
            'address',
            'max_coordinators',
            'users'
        ]


    def validate(self, data):
        org_name = data.get('Organization_name')
        qs = Organization.objects.filter(Organization_name__iexact=org_name)
        if self.instance:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError("Organization name already exists.")
        return data


    
