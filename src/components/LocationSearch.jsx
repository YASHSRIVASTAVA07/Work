import React from 'react';

const LocationSearch = () => {
  return (
    <div style={{
      backgroundColor: '#232323',
      padding: 16,
      marginTop: 24,
      borderRadius: 10
    }}>
      <label htmlFor="loc-search" style={{ color: '#CCC', marginRight: 12 }}>Search Location:</label>
      <input
        id="loc-search"
        type="text"
        placeholder="Enter location..."
        style={{
          backgroundColor: '#191919',
          borderRadius: 6,
          border: '1px solid #333',
          color: 'white',
          padding: '8px',
          width: '60%'
        }}
      />
    </div>
  );
};

export default LocationSearch;
