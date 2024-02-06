from rest_framework import serializers

from . import models


class PokemonSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = models.Pokemon
        fields = ['id', 'name', 'picture_url', 'is_favorite']

    def get_is_favorite(self, obj):

        if not self.context.get('request', None):
            return False

        user = self.context['request'].user
        if user.is_authenticated:
            return models.FavoritePokemon.objects.filter(user=user, pokemon=obj).exists()
        return False