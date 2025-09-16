import React, { useState } from 'react';

const MapPage = () => {
  const [mapDropdownOpen, setMapDropdownOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setMapDropdownOpen(!mapDropdownOpen)}
        style={{
          backgroundColor: '#262626',
          color: 'white',
          padding: '6px 14px',
          borderRadius: 6,
          border: 'none',
          marginBottom: 10,
          cursor: 'pointer'
        }}
      >Map Dropdown ▼</button>
      {mapDropdownOpen && (
        <div style={{ backgroundColor: '#222', borderRadius: 6, padding: '8px', color: 'white' }}>
          <div style={{ padding: '4px 0' }}>View All Maps</div>
          <div style={{ padding: '4px 0' }}>Heatmap</div>
        </div>
      )}
      <div style={{
        backgroundColor: '#191919',
        height: 150,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ddd',
        textAlign: 'center',
        fontSize: 16,
        userSelect: 'none',
        marginTop: 10
      }}>
        Map Content Here
      </div>
    </div>
  );
};

export default MapPage;
