import React from "react";

export default function ChartDropdown({ open, setOpen, chartType, setChartType }) {
  return (
    <div className="dropdown-relative">
      <button className="maptype-btn" onClick={() => setOpen(v => !v)}>
        {chartType} <span className={`carret ${open ? "open" : ""}`}>^</span>
      </button>
      {open && (
        <div className="maptype-overlay">
          <div onClick={() => { setChartType("Salinity"); setOpen(false); }}>Salinity</div>
          <div onClick={() => { setChartType("Pressure"); setOpen(false); }}>Pressure</div>
          <div onClick={() => { setChartType("Temperature"); setOpen(false); }}>Temperature</div>
        </div>
      )}
    </div>
  );
}
