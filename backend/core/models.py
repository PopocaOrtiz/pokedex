from django.db import models
from django.contrib.auth.models import User



class Pokemon(models.Model):
    name = models.CharField(max_length=255)
    picture_url = models.URLField()

    def __str__(self):
        return self.name


class FavoritePokemon(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s favorite: {self.pokemon.name}"