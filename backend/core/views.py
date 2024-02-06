from rest_framework import viewsets, status
from rest_framework.mixins import ListModelMixin
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers


class PokemonViewSet(
    ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = models.Pokemon.objects.all()
    serializer_class = serializers.PokemonSerializer

    def list(self, request):

        import time; time.sleep(1) # fake delay

        queryset = self.filter_queryset(self.get_queryset())
        name = request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post', 'delete'])
    def mark_as_favorite(self, request, pk=None):
        pokemon = self.get_object()
        user = request.user

        if request.method == 'POST':
            models.FavoritePokemon.objects.get_or_create(user=user, pokemon=pokemon)
            return Response({'message': 'Pokemon marked as favorite'}, status=status.HTTP_200_OK)
        
        elif request.method == 'DELETE':
            favorite_pokemon = models.FavoritePokemon.objects.filter(user=user, pokemon=pokemon).first()
            if favorite_pokemon:
                favorite_pokemon.delete()

            return Response({'message': 'Pokemon removed from favorites'}, status=status.HTTP_200_OK)