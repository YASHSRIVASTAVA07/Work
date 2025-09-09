import React, { useState } from 'react';

const ChartPage = () => {
  const [chartDropdownOpen, setChartDropdownOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setChartDropdownOpen(!chartDropdownOpen)}
        style={{
          backgroundColor: '#262626',
          color: 'white',
          padding: '6px 14px',
          borderRadius: 6,
          border: 'none',
          marginBottom: 10,
          cursor: 'pointer'
        }}
      >Chart Dropdown ▼</button>
      {chartDropdownOpen && (
        <div style={{ backgroundColor: '#222', borderRadius: 6, padding: '8px', color: 'white' }}>
          <div style={{ padding: '4px 0' }}>Bar Chart</div>
          <div style={{ padding: '4px 0' }}>Pie Chart</div>
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
        Chart Content Here
      </div>
    </div>
  );
};

export default ChartPage;
