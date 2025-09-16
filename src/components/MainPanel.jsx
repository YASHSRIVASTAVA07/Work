import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MainPanel({ tab, chartType, chartData, hasChartData, formData }) {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    
    return chartData.map((item, index) => ({
      index: index + 1,
      value: chartType === "Temperature" ? item.temp :
             chartType === "Salinity" ? item.psal :
             chartType === "Pressure" ? item.pres : 0,
      latitude: item.latitude,
      longitude: item.longitude,
      float_id: item.float_id
    }));
  };

  const chartDisplayData = getChartData();

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
                  {chartType} Data ({chartDisplayData.length} points)
                </h3>
                {formData && (
                  <div className="chart-info">
                    <p>Location: {formData.latitude}, {formData.longitude}</p>
                    {formData.floatId && <p>Float ID: {formData.floatId}</p>}
                  </div>
                )}
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartDisplayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="index" 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value, name) => [
                      `${value.toFixed(3)}${chartType === 'Temperature' ? '°C' : chartType === 'Pressure' ? ' dbar' : ' PSU'}`,
                      chartType
                    ]}
                    labelFormatter={(index) => `Data Point ${index}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-placeholder">
              <div className="glow-square"></div>
              <h2>Chart Visualization</h2>
              <p>Enter data in the sidebar to load charts</p>
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
          }

          .chart-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .chart-header {
            margin-bottom: 20px;
          }

          .chart-title {
            color: white;
            text-align: center;
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 600;
          }

          .chart-info {
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
          }

          .chart-info p {
            margin: 2px 0;
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
          }
        `}</style>
      </div>
    );
  }

  return null;
}