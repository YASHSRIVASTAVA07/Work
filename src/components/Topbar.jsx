import React from "react";
import { FiUser, FiMessageCircle } from "react-icons/fi";

export default function Topbar({ tab, setTab, onChatbot }) {
  return (
    <div className="topbar-glass">
      <button
        className={`topbar-tab ${tab === "MAP" ? "active" : ""}`}
        onClick={() => setTab("MAP")}
      >
        MAP
      </button>

      <button
        className={`topbar-tab ${tab === "CHART" ? "active" : ""}`}
        onClick={() => setTab("CHART")}
      >
        CHART
      </button>

      <div className="topbar-actions">
        <button className="glass-btn"><FiUser size={21} /> Login</button>
        <button className="glass-btn" onClick={onChatbot}><FiMessageCircle size={21} /> AI Assistant</button>
      </div>
    </div>
  );
}
