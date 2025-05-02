
import React from 'react';

const Sort = ({ sortBy, onSortChange }) => {
  return (
    <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
      <option value="id-asc">Sort by ID (Asc)</option>
      <option value="id-desc">Sort by ID (Desc)</option>
      <option value="name-asc">Sort Alphabetically (A-Z)</option>
      <option value="name-desc">Sort Alphabetically (Z-A)</option>
    </select>
  );
};

export default Sort;
