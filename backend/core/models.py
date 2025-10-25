from django.db import models
from django.utils.text import slugify

class Organization(models.Model):
    LANGUAGE_CHOICES = [
        ('EN', 'English'),
        ('FR', 'French'),
        ('HI', 'Hindi'),
        ('ES', 'Spanish'),
        ('DE', 'German'),
    ]
    STATUS = [
        ('ACTIVE','active'),
        ('BLOCK','block'),
        ('IN-ACTIVE','in-active'),
    ]

    Organization_name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    language = models.CharField(max_length=5, choices=LANGUAGE_CHOICES, default='EN')
    status = models.CharField(max_length=10,choices=STATUS,default='ACTIVE')
    website = models.URLField(max_length=255, blank=True, null=True)
    address = models.TextField()
    max_coordinators = models.PositiveIntegerField(default=5)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.Organization_name)
            slug = base_slug
            n = 1
            while Organization.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)


    def __str__(self):
        return self.Organization_name


class User(models.Model):
    ROLE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('COORDINATOR', 'Coordinator'),
    ]

    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='COORDINATOR')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='users')

    def __str__(self):
        return f"{self.name} ({self.role}) - {self.organization.Organization_name}"
