import React, { useState } from "react";
import { FiMapPin, FiBarChart2 } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Sidebar() {
  const [latOpen, setLatOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <aside className="side-glass">
      <div className="dropdown-group">
        <button className="dropdown-btn" onClick={() => setLatOpen(v => !v)}>
          <FiMapPin style={{ marginRight: 8 }} />
          Lat/Long
          <span className={`carret ${latOpen ? "open" : ""}`}>▼</span>
        </button>
        {latOpen && (
          <div className="dropdown-menu">
            <label>
              Latitude
              <input className="glass-input" placeholder="Enter latitude" />
            </label>
            <label>
              Longitude
              <input className="glass-input" placeholder="Enter longitude" />
            </label>
          </div>
        )}

        <button className="dropdown-btn" onClick={() => setOtherOpen(v => !v)}>
          <FiBarChart2 style={{ marginRight: 8 }} />
          Other Data
          <span className={`carret ${otherOpen ? "open" : ""}`}>▼</span>
        </button>
        {otherOpen && (
          <div className="dropdown-menu">
            <label>
  Time Range
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    className="glass-input"
    placeholderText="Select a date"
    dateFormat="EEE, MMM d, yyyy"  // Example: Mon, Nov 17, 2018
    showMonthDropdown              // 👈 Month dropdown
    showYearDropdown               // 👈 Year dropdown
    dropdownMode="select"          // 👈 Makes them real dropdowns
  />
</label>

          </div>
        )}
      </div>
      <div className="side-help-btn">
        <span></span>
      </div>
    </aside>
  );
}
