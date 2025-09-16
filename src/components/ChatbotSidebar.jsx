import React, { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

export default function ChatbotSidebar({ messages, setChatbotOpen, handleSend }) {
  const [input, setInput] = useState("");

  const send = () => {
    if (input.trim() !== "") {
      handleSend(input.trim());
      setInput("");
    }
  };

  return (
    <aside className="chatbot-sidebar">
      <div className="chatbot-header">
        <FiMessageCircle size={22} />
        <span style={{marginLeft:8}}>AI Assistant</span>
        <button className="chatbot-close" onClick={() => setChatbotOpen(false)}>
          <FiX size={21} />
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`msg-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-panel">
        <input
          className="chatbot-input"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="chatbot-send" onClick={send}><FiSend size={22} /></button>
      </div>
    </aside>
  );
}
