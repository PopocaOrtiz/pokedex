import React, { useState } from 'react';

const NavBar: React.FC<{ onSearch: (text: string) => void }> = ({ onSearch }) => {

    const [searchText, setSearchText]  = useState<string>("");

    const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchText);
        }
    }

    const searchHandler = () => {
        onSearch(searchText);
    }

    return (
        <header className="navbar">
            <section className="navbar-section">
                <a href="/" className="navbar-brand mr-2">Pokedex</a>
            </section>
            <section className="navbar-section">
                <div className="input-group input-inline">
                    <input value={searchText} onChange={changeSearchHandler} onKeyDown={keyDownHandler}
                        className="form-input" type="text" placeholder="search" />
                    <button onClick={searchHandler}
                        className="btn btn-primary input-group-btn">Search</button>
                </div>
            </section>
        </header>
    );
}

export default NavBar;