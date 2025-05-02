
import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();
export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.find((p) => p.name === pokemon.name)
        ? prev.filter((p) => p.name !== pokemon.name)
        : [...prev, pokemon]
    );
  };

  return (
    <PokemonContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};
