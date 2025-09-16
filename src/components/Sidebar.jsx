import React, { useState, useEffect } from "react";
import { FiMapPin, FiBarChart2, FiAnchor } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";

export default function Sidebar({ onDataSubmit, csvFilename }) {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    timeRange: null,
    floatId: ""
  });
  
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load CSV data when component mounts
  useEffect(() => {
    if (csvFilename) {
      loadCSVData(csvFilename);
    }
  }, [csvFilename]);

  const loadCSVData = async (filename) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try multiple methods to read the CSV file
      let csvContent;
      
      // Method 1: Try window.fs.readFile if available
      if (window.fs && window.fs.readFile) {
        try {
          csvContent = await window.fs.readFile(filename, { encoding: 'utf8' });
        } catch (fsError) {
          console.log('window.fs.readFile failed, trying fetch method');
          throw fsError;
        }
      } else {
        throw new Error('window.fs not available');
      }
      
      // Parse CSV with Papa Parse
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }
          setCsvData(results.data);
          setLoading(false);
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          setError('Failed to parse CSV file');
          setLoading(false);
        }
      });
    } catch (err) {
      console.log('Trying fetch method as fallback...');
      
      // Fallback: Try using fetch to load the file from public folder
      try {
        const response = await fetch(filename);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvContent = await response.text();
        
        // Parse CSV with Papa Parse
        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn('CSV parsing warnings:', results.errors);
            }
            setCsvData(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            setError('Failed to parse CSV file');
            setLoading(false);
          }
        });
      } catch (fetchErr) {
        console.error('Both file reading methods failed:', err, fetchErr);
        setError(`Failed to read CSV file. Please ensure the file exists at: ${filename}`);
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to randomly select data points from a column
  const getRandomDataPoints = (columnData, count = 10) => {
    if (!Array.isArray(columnData)) return [];
    
    const validData = columnData.filter(value => 
      value !== null && 
      value !== undefined && 
      value !== '' && 
      !isNaN(value)
    );
    
    if (validData.length === 0) return [];
    
    // If we have fewer valid data points than requested, return all
    if (validData.length <= count) {
      return validData;
    }
    
    // Randomly select data points
    const shuffled = [...validData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Function to parse multiple data points from a column (assuming they're comma-separated or similar)
  const parseMultipleDataPoints = (dataString) => {
    if (typeof dataString === 'number') {
      return [dataString];
    }
    
    if (typeof dataString === 'string') {
      // Try to split by common separators
      const separators = [',', ';', '|', ' '];
      for (const sep of separators) {
        if (dataString.includes(sep)) {
          return dataString.split(sep)
            .map(val => parseFloat(val.trim()))
            .filter(val => !isNaN(val));
        }
      }
      
      // If no separators found, try to parse as single number
      const parsed = parseFloat(dataString);
      return isNaN(parsed) ? [] : [parsed];
    }
    
    return [];
  };

  const handleSubmit = () => {
    if (!formData.latitude || !formData.longitude || !formData.timeRange) {
      alert("Please fill all the * columns");
      return;
    }

    if (csvData.length === 0) {
      alert("No CSV data available");
      return;
    }

    // Randomly select one row from the CSV
    const randomRowIndex = Math.floor(Math.random() * csvData.length);
    const selectedRow = csvData[randomRowIndex];
    
    console.log('Selected random row:', selectedRow);

    // Create the data structure to pass to parent component
    const submissionData = {
      selectedRow: selectedRow,
      formData: formData,
      getChartData: (chartType) => {
        let columnName;
        switch (chartType) {
          case 'Temperature':
            columnName = 'temp';
            break;
          case 'Salinity':
            columnName = 'psal';
            break;
          case 'Pressure':
            columnName = 'pres';
            break;
          default:
            columnName = 'temp';
        }

        if (!selectedRow[columnName]) {
          console.warn(`Column ${columnName} not found in selected row`);
          return [];
        }

        // Parse and get random data points from the selected column
        const allDataPoints = parseMultipleDataPoints(selectedRow[columnName]);
        const randomDataPoints = getRandomDataPoints(allDataPoints, 10);
        
        console.log(`Random ${chartType} data points:`, randomDataPoints);
        return randomDataPoints;
      }
    };

    onDataSubmit(submissionData);
  };

  const isFormValid = formData.latitude && formData.longitude && formData.timeRange;

  return (
    <aside className="side-glass">
      <div className="sidebar-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="loading-message">
            Loading CSV data...
          </div>
        )}

        

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
            className={`enter-button ${isFormValid && csvData.length > 0 ? 'active' : 'disabled'}`}
            disabled={!isFormValid || csvData.length === 0}
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

        .error-message {
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 8px;
          padding: 12px;
          color: #fca5a5;
          font-size: 14px;
        }

        .loading-message {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          padding: 12px;
          color: #93c5fd;
          font-size: 14px;
          text-align: center;
        }

        .csv-status {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 8px;
          padding: 8px 12px;
          color: #86efac;
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </aside>
  );
}