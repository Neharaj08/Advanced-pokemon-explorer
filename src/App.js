import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom'; // ✅ added useLocation
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import ComparisonPage from './pages/ComparisonPage';
import PokemonDetailPage from './pages/PokemonDetailPage';

import Pagination from './components/Pagination';

import { PokemonProvider } from './contexts/PokemonContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const location = useLocation(); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return pokemonData;
          })
        );
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PokemonProvider>
      <ComparisonProvider>
        <div>
          <h1>Pokemon Explorer</h1>

          <Link to="/favorites" className="button-link">Go to Favorites</Link>
<Link to="/comparison" className="button-link">Go to Comparison</Link>


          {loading ? (
            <p>Loading Pokemon...</p>
          ) : (
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage pokemons={currentPokemons} />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/comparison" element={<ComparisonPage />} />
                <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
              </Routes>

          
              {location.pathname === '/' && (
                <Pagination
                  totalItems={pokemons.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              )}
            </ErrorBoundary>
          )}
        </div>
      </ComparisonProvider>
    </PokemonProvider>
  );
};

export default App;
