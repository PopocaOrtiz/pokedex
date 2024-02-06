import { useEffect, useState } from 'react';

import List from './List';
import NavBar from '../UI/NavBar';
import Loading from '../UI/Loading';
import EmptyList from './EmptyList';

import { IPokemon } from '../interfaces';

import { API_URL } from '../config';

const Pokedex = () => {

    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const getPokemons = async (search?: string) => {

        setLoading(true);
        setError('');

        let url = API_URL + '?';

        if (search) {
            url += `&name=${search}`
        }

        try {
            const response = await fetch(url);
            const data = await response.json() as any;
            setPokemons(data);
        } catch(e) {
            console.error('unexpected error', e);
            setError('unexpected error');
        }

        setLoading(false);
    }

    useEffect(() => {
        getPokemons();
    }, []);

    const searchHandler = (text: string) => {
        getPokemons(text);
    }

    const saveChangeHandler = (id: number, is_favorite: boolean) => {
        setPokemons(pokemons => {

            const newPokemons = [...pokemons];

            const index = newPokemons.findIndex(pokemon => pokemon.id === id);
            if (index === -1) return newPokemons;
        
            newPokemons[index] = {
                ...newPokemons[index],
                is_favorite: is_favorite
            };
            
            return newPokemons;
        })
    }

    let content = <EmptyList />;

    if (pokemons.length) {
        content = <List pokemons={pokemons} onSaveChange={saveChangeHandler} />;
    }

    return (
        <div className="m-2 p-2">
            <NavBar onSearch={searchHandler} />
            <br />
            {error && <div className="toast toast-error">{error}</div>}
            {loading && <Loading />}
            {!loading && content}
        </div>
    );
}

export default Pokedex;