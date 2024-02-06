import requests
from django.core.management.base import BaseCommand
from core.models import Pokemon


def get_pokemons_from_pokeapi():
    api_url = 'https://pokeapi.co/api/v2/pokemon?limit=151'

    response = requests.get(api_url)
    data = response.json()

    return data['results']


def get_pokemon_from_pokeapi(pokemon_url):
    pokemon_response = requests.get(pokemon_url)
    return pokemon_response.json()


class Command(BaseCommand):
    help = 'Fetches pokemon\'s data from PokeAPI and stores the first 151 Pokemon in the database'

    def handle(self, *args, **options):
        
        results = get_pokemons_from_pokeapi()

        for pokemon_data in results:
            pokemon_name = pokemon_data['name']
            pokemon_url = pokemon_data['url']

            pokemon_details = get_pokemon_from_pokeapi(pokemon_url)

            pokemon, created = Pokemon.objects.update_or_create(
                name=pokemon_name,
                defaults={'picture_url': pokemon_details['sprites']['front_default']}
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully added {pokemon_name} to the database'))
            else:
                self.stdout.write(self.style.NOTICE(f'{pokemon_name} already exists in the database'))

        self.stdout.write(self.style.SUCCESS('Data import completed'))