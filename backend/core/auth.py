from rest_framework.authentication import BaseAuthentication
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class SpecificUserAuthentication(BaseAuthentication):
    def authenticate(self, request):
        username = 'myuser'
        return (User.objects.first(), None)