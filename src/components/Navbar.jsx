import React from 'react';

const Navbar = ({ onToggleChatbot }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(30,30,30,0.75)',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '15px 30px',
      zIndex: 1000,
      color: 'white',
      userSelect: 'none',
    }}>
      <button style={{
        backgroundColor: '#252525',
        padding: '8px 22px',
        marginRight: '15px',
        borderRadius: 50,
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>Login</button>
      <button onClick={onToggleChatbot} style={{
        backgroundColor: '#252525',
        padding: '8px 22px',
        borderRadius: 50,
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>Chatbot</button>
    </header>
  );
};

export default Navbar;
