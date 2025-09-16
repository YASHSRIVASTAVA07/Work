import React, { useState } from "react";
import { FiMapPin, FiBarChart2, FiAnchor} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Sidebar() {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    timeRange: null,
    floatId: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!formData.latitude || !formData.longitude || !formData.timeRange) {
      alert("Please fill all the * columns");
      return;
    }
    
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const isFormValid = formData.latitude && formData.longitude && formData.timeRange;

  return (
    <aside className="side-glass">
      <form onSubmit={handleSubmit} className="sidebar-form">
        <div className="form-group">
          <label className="form-label">
            <FiMapPin style={{ marginRight: 8 }} />
            Latitude
            <span className="required-asterisk">*</span>
          </label>
          <input 
            className="glass-input" 
            placeholder="Enter latitude"
            value={formData.latitude}
            onChange={(e) => handleInputChange('latitude', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiMapPin style={{ marginRight: 8 }} />
            Longitude
            <span className="required-asterisk">*</span>
          </label>
          <input 
            className="glass-input" 
            placeholder="Enter longitude"
            value={formData.longitude}
            onChange={(e) => handleInputChange('longitude', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiBarChart2 style={{ marginRight: 8 }} />
            Time Range
            <span className="required-asterisk">*</span>
          </label>
          <DatePicker
            selected={formData.timeRange}
            onChange={(date) => handleInputChange('timeRange', date)}
            className="glass-input"
            placeholderText="Select a date"
            dateFormat="EEE, MMM d, yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FiAnchor style={{ marginRight: 8 }} />
            Float-ID
          </label>
          <input 
            className="glass-input" 
            placeholder="Enter float ID"
            value={formData.floatId}
            onChange={(e) => handleInputChange('floatId', e.target.value)}
          />
        </div>

        <div className="form-footer">
          <p className="required-note">
            Fill all the <span className="required-asterisk">*</span> columns
          </p>
          <button 
            type="submit" 
            className={`enter-button ${isFormValid ? 'active' : 'disabled'}`}
            disabled={!isFormValid}
          >
            Enter
          </button>
        </div>
      </form>

      <style jsx>{`
        .sidebar-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          color: #e0e0e0;
        }

        .required-asterisk {
          color: #dc2626;
          margin-left: 4px;
          font-weight: bold;
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .required-note {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
        }

        .enter-button {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .enter-button.active {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .enter-button.active:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .enter-button.disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
          cursor: not-allowed;
        }

        .side-glass {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          min-height: 100vh;
          width: 320px;
        }
      `}</style>
    </aside>
  );
}
