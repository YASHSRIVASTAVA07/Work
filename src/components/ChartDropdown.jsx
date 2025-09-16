import React from "react";

export default function ChartDropdown({ open, setOpen, chartType, setChartType }) {
  return (
    <div className="dropdown-relative">
      <button className="maptype-btn" onClick={() => setOpen(v => !v)}>
        {chartType} <span className={`carret ${open ? "open" : ""}`}>▼</span>
      </button>
      {open && (
        <div className="maptype-overlay">
          <div onClick={() => { setChartType("Temperature"); setOpen(false); }}>Temperature</div>
          <div onClick={() => { setChartType("Salinity"); setOpen(false); }}>Salinity</div>
          <div onClick={() => { setChartType("Pressure"); setOpen(false); }}>Pressure</div>
        </div>
      )}

      <style jsx>{`
        .dropdown-relative {
          position: relative;
          display: inline-block;
          width: auto;
        }

        .maptype-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 12px 20px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: all 0.2s ease;
          font-size: 16px;
          font-weight: 500;
          width: auto;
          white-space: nowrap;
        }

        .maptype-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .maptype-overlay {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(30, 30, 30, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          margin-top: 8px;
          z-index: 1000;
          width: max-content;
          min-width: 160px;
          padding: 6px 0;
        }

        .maptype-overlay div {
          padding: 12px 18px;
          color: white;
          cursor: pointer;
          transition: background 0.2s ease;
          font-size: 15px;
          font-weight: 400;
          white-space: nowrap;
        }

        .maptype-overlay div:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .maptype-overlay div:first-child {
          border-radius: 12px 12px 0 0;
        }

        .maptype-overlay div:last-child {
          border-radius: 0 0 12px 12px;
        }

        .carret {
          transition: transform 0.2s ease;
          font-size: 14px;
        }

        .carret.open {
          transform: rotate(0deg);
        }
      `}</style>
    </div>
  );
}