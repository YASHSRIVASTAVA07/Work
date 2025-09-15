import React from "react";

export default function MapTypeDropdown({ open, setOpen, setMapType, mapType }) {
  return (
    <div className="dropdown-relative">
      <button className="maptype-btn" onClick={() => setOpen(v => !v)}>
        {mapType} <span className={`carret ${open ? "open" : ""}`}>^</span>
      </button>
      {open && (
        <div className="maptype-overlay">
          <div onClick={() => { setMapType("Satellite"); setOpen(false); }}>Satellite</div>
          <div onClick={() => { setMapType("Street"); setOpen(false); }}>Street</div>
          <div onClick={() => { setMapType("Hybrid"); setOpen(false); }}>Hybrid</div>
          <div onClick={() => { setMapType("Terrain"); setOpen(false); }}>Terrain</div>
        </div>
      )}
    </div>
  );
}
