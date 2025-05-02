import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite, handleSelectForComparison }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(pokemon.url || `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchDetails();
  }, [pokemon]);

  if (!pokemonData) return <div></div>;

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', width: '150px', textAlign: 'center' }}>
     
      <Link to={`/pokemon/${pokemonData.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h4>{pokemonData.name.toUpperCase()}</h4>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} width="100" />
      </Link>

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => toggleFavorite(pokemon)}>
          {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
        </button>
        <br />
        <button onClick={() => handleSelectForComparison(pokemon)}>
          Compare
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
