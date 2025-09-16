import React, { useState } from "react";
import { FiMapPin, FiBarChart2, FiAnchor } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample data matching your format
const sampleData = [
  { id: 1002, float_id: 'b1901701', juld: '57:10.0', latitude: -33.71372, longitude: 57.5094, pres: 1.1599999, temp: 22.277999, psal: 35.888000 },
  { id: 1181, float_id: 'b1901712', juld: '45:08.0', latitude: 15.89995, longitude: -20.38539, pres: 1.1919999, temp: 28.481000, psal: 35.611999 },
  { id: 1182, float_id: 'b1901712', juld: '39:09.0', latitude: 15.98729, longitude: -20.37144, pres: 1.0800000, temp: 29.138000, psal: 35.731998 },
  { id: 515, float_id: 'b1901514', juld: '32:01.0', latitude: 1.625, longitude: 44.639, pres: 0, temp: 26.208000, psal: 0.0120000 },
  { id: 516, float_id: 'b1901514', juld: '29:17.0', latitude: 1.624, longitude: 44.639, pres: -0.2000000, temp: 27.697999, psal: 0.0130000 },
  { id: 1229, float_id: 'b1901712', juld: '33:04.0', latitude: 17.8523, longitude: -22.64848, pres: 1.1200000, temp: 22.166999, psal: 36.435001 },
  { id: 517, float_id: 'b1901514', juld: '17:37.0', latitude: 1.626, longitude: 44.643, pres: 0, temp: 33.118000, psal: 0.0149999 },
  { id: 2788, float_id: 'b1901787', juld: '27:17.3', latitude: -18.33851, longitude: 65.47587, pres: 1.2, temp: 25.957000, psal: 34.989799 },
  { id: 2789, float_id: 'b1901787', juld: '09:59.0', latitude: -20.23978, longitude: 64.8024, pres: 1.0399999, temp: 24.379999, psal: 35.045398 },
  { id: 201, float_id: 'b1901443', juld: '57:46.0', latitude: -3.624, longitude: 74.178, pres: 4.3000001, temp: 29.743000, psal: 35.013000 }
];

export default function Sidebar({ onDataSubmit }) {
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

  const handleSubmit = () => {
    if (!formData.latitude || !formData.longitude || !formData.timeRange) {
      alert("Please fill all the * columns");
      return;
    }
    
    // Filter data based on form inputs
    let filteredData = sampleData;
    
    if (formData.floatId) {
      filteredData = filteredData.filter(item => 
        item.float_id.toLowerCase().includes(formData.floatId.toLowerCase())
      );
    }
    
    // For demo purposes, we'll use lat/long to filter nearby data
    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      filteredData = filteredData.filter(item => {
        const latDiff = Math.abs(item.latitude - lat);
        const lngDiff = Math.abs(item.longitude - lng);
        return latDiff < 50 && lngDiff < 50; // Within 50 degrees for demo
      });
    }
    
    // If no data found nearby, return all data for demo
    if (filteredData.length === 0) {
      filteredData = sampleData;
    }
    
    onDataSubmit(filteredData, formData);
  };

  const isFormValid = formData.latitude && formData.longitude && formData.timeRange;

  return (
    <aside className="side-glass">
      <div className="sidebar-form">
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
            Float ID
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
            type="button" 
            className={`enter-button ${isFormValid ? 'active' : 'disabled'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Enter
          </button>
        </div>
      </div>

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
      `}</style>
    </aside>
  );
}