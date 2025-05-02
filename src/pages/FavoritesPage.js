import React from 'react';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../contexts/PokemonContext';
import { useComparison } from '../contexts/ComparisonContext';
import { Link } from 'react-router-dom';
const FavoritesPage = () => {
  const { favorites, toggleFavorite } = usePokemon();
  const { handleSelectForComparison } = useComparison();

  return (
    <div className="center-container">
      <h2 id="fav">Favorites</h2>
     <Link to="/" className="button-link">Back to Home</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
            handleSelectForComparison={handleSelectForComparison}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
