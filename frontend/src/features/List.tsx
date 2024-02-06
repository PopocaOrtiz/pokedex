import React, { useState } from 'react';

import Detail from './Detail';

import { IPokemon } from '../interfaces';

import { API_URL } from '../config';

interface IProps {
    pokemons: IPokemon[];
    onSaveChange: (id: number, saved: boolean) => void 
}

const List: React.FC<IProps> = ({ pokemons, onSaveChange }) => {

    const [error, setError] = useState<string>('');
    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);

    const buildPokemonDetailUrl = (id: number) => {
        return `${API_URL}${id}/mark_as_favorite/`;
    }

    const unSaveHandler = async (pokemon: IPokemon) => {

        setError('');
        const url = buildPokemonDetailUrl(pokemon.id);

        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('error on unsaving request');
            }
            onSaveChange(pokemon.id, false);
        } catch(e) {
            console.error('unexpected error', e);
            setError('unexpected error');
        }
    }

    const saveHandler = async (pokemon: IPokemon) => {
        
        setError('');
        
        const url = buildPokemonDetailUrl(pokemon.id);

        try {
            const response = await fetch(url, { method: 'POST' });
            if (!response.ok) {
                throw new Error('error on saving request');
            }
            onSaveChange(pokemon.id, true);
        } catch(e) {
            console.error('unexpected error', e);
            setError('unexpected error');
        }
    }

    const viewPokemonHandler = (pokemon: IPokemon) => {
        setSelectedPokemon(pokemon);
    }

    return (<>
        {error && <div className="toast toast-error">{error}</div>}
        {selectedPokemon && <Detail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
        <div className="columns">
            {pokemons.map(pokemon => (
                <div key={pokemon.id} className="column col-4">
                    <div className="card m-2 p-2">
                        <div className="card-image">
                            <img src={pokemon.picture_url} style={{width: '100%'}} />
                        </div>
                        <div className="card-body">
                            {pokemon.name}
                        </div>
                        <div className="card-footer">
                            <button onClick={() => viewPokemonHandler(pokemon)} 
                                className="btn float-right">
                                view
                            </button>
                            {pokemon.is_favorite && (
                                <button onClick={() => unSaveHandler(pokemon)}
                                    className="btn btn-primary">
                                    <i className="icon icon-bookmark mr-2"></i>
                                    Saved
                                </button>
                            )}
                            {!pokemon.is_favorite && (
                                <button onClick={() => saveHandler(pokemon)}
                                    className="btn">
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>);
}

export default List;