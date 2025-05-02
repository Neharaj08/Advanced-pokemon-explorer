
import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{
          margin: '0 5px',
          padding: '8px 12px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: currentPage === 1 ? '#e0e0e0' : '#f0f0f0',
          color: '#000',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        ◀ Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          style={{
            margin: '0 5px',
            padding: '8px 12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: currentPage === number ? 'blue' : '#f0f0f0',
            color: currentPage === number ? '#fff' : '#000',
            cursor: 'pointer',
            fontWeight: currentPage === number ? 'bold' : 'normal',
          }}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          margin: '0 5px',
          padding: '8px 12px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#f0f0f0',
          color: '#000',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
