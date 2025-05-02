import React, { useState } from 'react';

const RandomPokemonButton = ({ onRandomPokemon }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      onRandomPokemon(data);
    } catch (error) {
      console.error("Failed to fetch random Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="random-btn" onClick={handleClick} disabled={loading}>
      {loading ? 'Loading...' : 'Show Random Pokemon'}
    </button>
  );
};

export default RandomPokemonButton;

