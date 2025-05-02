
import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for Pokemon"
        onChange={handleChange}
        style={{ padding: '8px', width: '200px', marginBottom: '10px' }}
      />
    </div>
  );
};

export default SearchBar;
