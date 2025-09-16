import React from "react";

export default function ActionsPanel({ chatbotOpen, setChatbotOpen }) {
  return (
    <div className="actions-glass" style={{ filter: chatbotOpen ? "blur(2px)" : "none" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button className="action-btn">Export Data</button>
        <button className="action-btn">Save View</button>
        <button className="action-btn">Share Link</button>
      </div>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
        <span className="online-dot"></span>
        <span style={{ color: "#ccd4e0", fontSize: 16 }}>System Online</span>
      </div>
    </div>
  );
}
