import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PokemonDetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const data = await response.json();
        
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        setPokemon(data);
        setEvolutionChain(evolutionData.chain);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemon();
  }, [name]);

  // Function to render evolution chain
  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    const evolutionList = [];
    let current = chain;

    while (current) {
      evolutionList.push(current.species.name);
      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    return (
      <div>
        <h3>Evolution Chain</h3>
        <p>{evolutionList.join(' → ')}</p>
      </div>
    );
  };

  // Function to render moves
  const renderMoves = (moves) => {
    return moves.slice(0, 10).map((move) => (
      <li key={move.move.name}>{move.move.name}</li>
    ));
  };

  if (error) return <p style={{ color: 'blue' }}>{error}</p>;
  if (!pokemon) return <div className="loading">Loading...</div>;

  return (
    <div className="center-container" style={{ padding: '1rem' }}>
     <Link to="/" className="button-link">Back to Home</Link>
<h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>ID:</strong> {pokemon.id}</p>
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <p><strong>Stats:</strong></p>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      

      {renderEvolutionChain(evolutionChain)}

     
      <h3>Moves:</h3>
      <ul>{renderMoves(pokemon.moves)}</ul>
    </div>
  );
};

export default PokemonDetailPage;
