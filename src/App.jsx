import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapPage from './components/MapPage';
import ChartPage from './components/ChartPage';
import LocationSearch from './components/LocationSearch';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div style={{
      background: '#181818',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <Navbar onToggleChatbot={() => setShowChatbot(!showChatbot)} />
      <div style={{flex: 1, display: 'flex'}}>
        <Sidebar />
        <main style={{
          flex: 1,
          padding: '15px',
          transition: 'margin 0.3s ease-in-out',
          marginRight: showChatbot ? '320px' : '0',
          overflowY: 'auto'
        }}>
          <div style={{marginBottom: 12}}>
            <button
              onClick={() => setActiveTab('map')}
              style={{
                marginRight: 10,
                padding: '8px 20px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'map' ? '#333' : '#222',
                color: '#eee',
                cursor: 'pointer',
              }}
            >
              MAP
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              style={{
                padding: '8px 20px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'chart' ? '#333' : '#222',
                color: '#eee',
                cursor: 'pointer',
              }}
            >
              Chart
            </button>
          </div>
          <div style={{
            backgroundColor: '#232323',
            borderRadius: 10,
            padding: 20,
            boxShadow: '0 0 15px rgba(0,0,0,0.6)'
          }}>
            {activeTab === 'map' ? <MapPage /> : <ChartPage />}
          </div>
          <LocationSearch />
        </main>
        {showChatbot && <Chatbot />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
