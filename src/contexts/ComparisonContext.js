
import React, { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();
export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);

  const handleSelectForComparison = (pokemon) => {
    setSelectedPokemons((prev) => {
      if (prev.find((p) => p.name === pokemon.name)) return prev;
      if (prev.length === 2) return [prev[1], pokemon];
      return [...prev, pokemon];
    });
  };

  return (
    <ComparisonContext.Provider value={{ selectedPokemons, handleSelectForComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};
