import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MainPanel({ tab, chartType, chartData, hasChartData, formData, selectedRow }) {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    // New data structure: chartData is now an array of numbers
    return chartData.map((value, index) => ({
      index: index + 1,
      value: value, // Direct numeric value from the CSV column
      dataPoint: `Point ${index + 1}`
    }));
  };

  const chartDisplayData = getChartData();

  // Get units for the chart type
  const getUnit = (type) => {
    switch(type) {
      case 'Temperature': return '°C';
      case 'Pressure': return ' dbar';
      case 'Salinity': return ' PSU';
      default: return '';
    }
  };

  if (tab === "MAP") {
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
          <button className="search-btn">
            <span role="img" aria-label="search">🔎</span>
          </button>
        </div>

        <style jsx>{`
          .mainpanel-glass {
            flex: 1;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .mainpanel-center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .map-placeholder {
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
          }

          .glow-square {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            margin: 0 auto 20px;
            border-radius: 12px;
            opacity: 0.6;
          }

          .mainpanel-bottom {
            padding: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            gap: 12px;
          }

          .location-search-glass {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 12px 16px;
            color: white;
          }

          .location-search-glass::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          .search-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border: none;
            border-radius: 8px;
            padding: 12px 16px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  if (tab === "CHART") {
    return (
      <div className="mainpanel-glass">
        <div className="mainpanel-center">
          {hasChartData && chartDisplayData.length > 0 ? (
            <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">
                  {chartType} Data
                </h3>
                <div className="chart-info">
                  {formData && (
                    <p>Form Location: {formData.latitude}, {formData.longitude}</p>
                  )}
                  {selectedRow && (
                    <>
                      <p>Selected Float ID: {selectedRow.float_id}</p>
                      <p>
                        Date:{" "}
                        {formData?.timeRange
                          ? formData.timeRange.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </>

                  )}
                  <p>Data Range: {Math.min(...chartData).toFixed(3)} - {Math.max(...chartData).toFixed(3)}{getUnit(chartType)}</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartDisplayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="index" 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                    label={{ value: 'Data Point', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' } }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                    label={{ value: `${chartType}${getUnit(chartType)}`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' } }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.9)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value, name) => [
                      `${value.toFixed(3)}${getUnit(chartType)}`,
                      chartType
                    ]}
                    labelFormatter={(index) => `Data Point ${index}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 3, fill: '#60a5fa' }}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              {/* Debug info */}
              <div className="debug-info">
                <details style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginTop: '10px' }}>
                  <summary>Debug Info (click to expand)</summary>
                  <p>Chart Data Length: {chartData.length}</p>
                  <p>Chart Data: [{chartData.map(v => v.toFixed(2)).join(', ')}]</p>
                  <p>Has Chart Data: {hasChartData.toString()}</p>
                </details>
              </div>
            </div>
          ) : (
            <div className="chart-placeholder">
              <div className="glow-square"></div>
              <h2>Chart Visualization</h2>
              <p>Enter data in the sidebar to load charts</p>
              {/* Debug info for when no data */}
              <div style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                <p>Has Chart Data: {hasChartData.toString()}</p>
                <p>Chart Data Length: {chartData ? chartData.length : 'null'}</p>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .mainpanel-glass {
            flex: 1;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .mainpanel-center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow: auto;
          }

          .chart-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            min-height: 500px;
          }

          .chart-header {
            margin-bottom: 20px;
            flex-shrink: 0;
          }

          .chart-title {
            color: white;
            text-align: center;
            margin-bottom: 15px;
            font-size: 20px;
            font-weight: 600;
          }

          .chart-info {
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .chart-info p {
            margin: 4px 0;
          }

          .chart-placeholder {
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
          }

          .glow-square {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            margin: 0 auto 20px;
            border-radius: 12px;
            opacity: 0.6;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.8; }
            100% { opacity: 0.6; }
          }

          .debug-info {
            margin-top: auto;
            padding-top: 10px;
          }

          details {
            cursor: pointer;
          }

          details summary {
            padding: 5px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
          }

          details[open] {
            background: rgba(255, 255, 255, 0.02);
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    );
  }

  return null;
}