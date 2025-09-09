import React from 'react';

const Chatbot = () => {
  return (
    <aside style={{
      width: 320,
      backgroundColor: '#242424ee',
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      padding: '40px 20px',
      boxShadow: '-2px 0 8px #000',
      overflowY: 'auto',
      color: 'white',
      userSelect: 'none'
    }}>
      <h2 style={{ marginBottom: 20 }}>Chatbot</h2>
      <div style={{
        backgroundColor: '#202020',
        borderRadius: 8,
        padding: 15,
        minHeight: 200,
        fontStyle: 'italic'
      }}>
        {/* Chatbot UI or components can be added here */}
        Chatbot conversation area...
      </div>
    </aside>
  );
};

export default Chatbot;
