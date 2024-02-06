from django.urls import reverse
from django.contrib.auth.models import User
import pytest
from rest_framework import status
from rest_framework.test import APIClient

from core import models
from core import serializers


API_URL = reverse('core:pokemon-list')


@pytest.fixture
def create_pokemon():
    def _create_pokemon(name, picture_url):
        return models.Pokemon.objects.create(name=name, picture_url=picture_url)
    return _create_pokemon


@pytest.fixture
def create_user(db):
    def _create_user(username='testuser', password='testpassword'):
        return User.objects.create_user(username=username, password=password)
    return _create_user


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_get_pokemon(api_client, create_pokemon, create_user):

    user = create_user()

    pikachu = create_pokemon(name="Pikachu", picture_url="https://example.com/pikachu.jpg")

    api_client.force_authenticate(user=user)
    
    response = api_client.get(API_URL)

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 1

    pokemon_data = response.data[0]

    pokemon_serialized = serializers.PokemonSerializer(pokemon_data).data

    assert pokemon_data == pokemon_serialized


@pytest.mark.django_db
def test_mark_pokemon_as_favorite(create_pokemon, create_user, api_client):

    user = create_user()

    pikachu = create_pokemon(name="Pikachu", picture_url="https://example.com/pikachu.jpg")

    api_client.force_authenticate(user=user)

    url = reverse('core:pokemon-mark-as-favorite', args=[pikachu.id])

    response = api_client.post(url)

    assert response.status_code == status.HTTP_200_OK

    assert models.FavoritePokemon.objects.filter(user=user, pokemon=pikachu).exists()