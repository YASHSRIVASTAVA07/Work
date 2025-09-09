import React, { useState } from 'react';

const Sidebar = () => {
  const [latDropdownOpen, setLatDropdownOpen] = useState(false);
  const [otherDropdownOpen, setOtherDropdownOpen] = useState(false);

  return (
    <aside style={{
      width: 220,
      backgroundColor: '#212121cc',
      paddingTop: 60,
      minHeight: '100vh',
      borderRight: '1px solid #333',
      color: 'white',
      userSelect: 'none'
    }}>
      <div style={{ padding: 10 }}>
        <button
          onClick={() => setLatDropdownOpen(!latDropdownOpen)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#262626',
            border: 'none',
            color: 'white',
            borderRadius: 6,
            marginBottom: 6,
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >Lat/Long ▼</button>
        {latDropdownOpen && (
          <div style={{ backgroundColor: '#191919', borderRadius: 6, padding: '8px' }}>
            <div style={{ padding: '6px 0' }}>Latitude 1</div>
            <div style={{ padding: '6px 0' }}>Latitude 2</div>
            <div style={{ padding: '6px 0' }}>Longitude 1</div>
          </div>
        )}
      </div>
      <div style={{ padding: 10 }}>
        <button
          onClick={() => setOtherDropdownOpen(!otherDropdownOpen)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#262626',
            border: 'none',
            color: 'white',
            borderRadius: 6,
            marginBottom: 6,
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >Other Data ▼</button>
        {otherDropdownOpen && (
          <div style={{ backgroundColor: '#191919', borderRadius: 6, padding: '8px' }}>
            <div style={{ padding: '6px 0' }}>Option A</div>
            <div style={{ padding: '6px 0' }}>Option B</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
