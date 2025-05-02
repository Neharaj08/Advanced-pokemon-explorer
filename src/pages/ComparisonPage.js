import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../contexts/ComparisonContext';

const ComparisonPage = () => {
  const { selectedPokemons } = useComparison();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedPokemons || selectedPokemons.length === 0) return;

      try {
        const responses = await Promise.all(
          selectedPokemons.map((p) =>
            fetch(p.url || `https://pokeapi.co/api/v2/pokemon/${p.name}`)
              .then(res => res.json())
          )
        );
        setDetails(responses);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchDetails();
  }, [selectedPokemons]);

  return (
    <div className="center-container">
      <h1>Comparison</h1>

   
      <Link to="/" className="button-link">Back to Home</Link>

   
      {selectedPokemons.length === 0 ? (
        <p>No Pokemon selected for comparison.</p>
      ) : details.length === 0 ? (
        <p>Loading Pokemon details...</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px' }}>
          {details.map((pokemon) => (
            <div key={pokemon.name} style={{ border: '1px solid black', padding: '10px' }}>
              <h3>
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name.toUpperCase()}</Link>
              </h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Types: {pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;
