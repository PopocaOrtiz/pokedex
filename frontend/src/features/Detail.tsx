import React from 'react';

import { IPokemon } from '../interfaces';

const Modal: React.FC<{ pokemon: IPokemon, onClose: () => void }> = ({ pokemon, onClose }) => {

    const closeHandler = () => {
        onClose();
    }

    return (
        <div className="modal active">
            <a onClick={closeHandler} href="#close" className="modal-overlay" aria-label="Close"></a>
            <div className="modal-container">
                <div className="modal-header">
                    <a onClick={closeHandler} href="#close"
                        className="btn btn-clear float-right" aria-label="Close"></a>
                    <div className="modal-title h5">{pokemon.name}</div>
                </div>
                <div className="modal-body">
                    <div className="content">
                        <img src={pokemon.picture_url} style={{width: '50%', margin: 'auto', display: 'block'}} />
                    </div>
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </div>
    );
}

export default Modal;