
import React from 'react';

const TypeFilter = ({ types, selectedTypes, onSelectType }) => {
  const handleTypeSelect = (type) => {
    if (selectedTypes.includes(type)) {
     
      onSelectType(selectedTypes.filter((selected) => selected !== type));
    } else {
     
      onSelectType([...selectedTypes, type]);
    }
  };

  return (
    <div>
      {types.map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeSelect(type)}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default TypeFilter;
