import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../contexts/PokemonContext';
import { useComparison } from '../contexts/ComparisonContext';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sort';
import TypeFilter from '../components/TypeFilter';
import RandomPokemonButton from '../components/RandomPokemonButton';
import { Link } from 'react-router-dom';

const HomePage = ({ pokemons = [] }) => {
  const { favorites, toggleFavorite } = usePokemon();
  const { handleSelectForComparison } = useComparison();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('id-asc');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const allTypes = Array.from(new Set(pokemons.flatMap(pokemon => pokemon.types.map(type => type.type.name))));

  useEffect(() => {
    if (pokemons.length > 0) {
      setLoading(false);
    }
  }, [pokemons]);

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypes =
      selectedTypes.length === 0 ||
      selectedTypes.every(type => pokemon.types.some(t => t.type.name === type));
    return matchesSearch && matchesTypes;
  });

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    switch (sortType) {
      case 'id-asc': return a.id - b.id;
      case 'id-desc': return b.id - a.id;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const handleRandomPokemon = (pokemonData) => {
    setRandomPokemon(pokemonData);
  };

  return (
    <div className="homepage-container">
   
      <div className="search-bar-container">
        <SearchBar onSearch={setSearchTerm} />
      </div>

    
      <div className="filters-container">
        <Sort sortBy={sortType} onSortChange={setSortType} />
        <TypeFilter types={allTypes} selectedTypes={selectedTypes} onSelectType={setSelectedTypes} />
        <RandomPokemonButton onRandomPokemon={handleRandomPokemon} />
      </div>

      {loading ? (
        <div className="center-container"><p>Loading...</p></div>
      ) : randomPokemon ? (
        <div className="center-container">
          <h2>{randomPokemon.name.toUpperCase()}</h2>
          <img
            src={randomPokemon.sprites?.other?.['official-artwork']?.front_default || randomPokemon.sprites?.front_default}
            alt={randomPokemon.name}
          />
          <p><strong>Types:</strong> {randomPokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Abilities:</strong> {randomPokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          <h4>Stats:</h4>
          <ul>
            {randomPokemon.stats.map(stat => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>

       
          <div className="nav-buttons">
            <Link to="/favorites"><button>Go to Favorites</button></Link>
            <Link to="/comparison"><button>Go to Comparison</button></Link>
          </div>

          <button onClick={() => setRandomPokemon(null)}>Back to All Pokémon</button>
        </div>
      ) : (
        <div className="pokemon-grid">
          {sortedPokemons.length > 0 ? (
            sortedPokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.some(f => f.id === pokemon.id)}
                toggleFavorite={toggleFavorite}
                handleSelectForComparison={handleSelectForComparison}
              />
            ))
          ) : (
            <p>No Pokemon match the current filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
