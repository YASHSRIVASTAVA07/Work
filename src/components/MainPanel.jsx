import React from "react";

export default function MainPanel() {
  return (
    <div className="mainpanel-glass">
      <div className="mainpanel-center">
        <div className="map-placeholder">
          <div className="glow-square"></div>
          <h2>Interactive Map</h2>
          <p>Map visualization will appear here</p>
        </div>
      </div>
      <div className="mainpanel-bottom">
        <input className="location-search-glass" placeholder="Search Location..." />
        <button className="search-btn"><span role="img" aria-label="search">🔎</span></button>
      </div>
    </div>
  );
}
