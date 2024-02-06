const EmptyList = () => {
    return (
        <div className="empty">
            <div className="empty-icon">
            <i className="icon icon-people"></i>
            </div>
            <p className="empty-title h5">No pokemons here.</p>
            <p className="empty-subtitle">No pokemons where found, try again.</p>
        </div>
    );
}

export default EmptyList;