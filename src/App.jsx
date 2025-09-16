import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MapTypeDropdown from "./components/MapTypeDropdown";
import ChartDropdown from "./components/ChartDropdown";
import MainPanel from "./components/MainPanel";
import ActionsPanel from "./components/ActionsPanel";
import ChatbotSidebar from "./components/ChatbotSidebar";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("MAP");
  const [mapTypeOpen, setMapTypeOpen] = useState(false);
  const [mapType, setMapType] = useState("Map Type");

  const [chartTypeOpen, setChartTypeOpen] = useState(false);
  const [chartType, setChartType] = useState("Temperature"); // Changed default to Temperature

  // Updated states for chart data integration
  const [chartData, setChartData] = useState([]);
  const [hasChartData, setHasChartData] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);

  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
    { from: "user", text: "I need help with the map visualization" },
    { from: "bot", text: "I can help you with that! What specific information are you looking for?" }
  ]);

  const handleSend = (msg) => {
    if (msg) setMessages([...messages, { from: "user", text: msg }]);
  };

  // Updated function to handle data submission from sidebar
  const handleDataSubmit = (submissionDataFromSidebar) => {
    console.log('Received submission data:', submissionDataFromSidebar);
    
    // Store the submission data so we can use getChartData later
    setSubmissionData(submissionDataFromSidebar);
    
    // Set the selected row info
    setSelectedRow(submissionDataFromSidebar.selectedRow);
    
    // Set form data
    setFormData(submissionDataFromSidebar.formData);
    
    // Get initial chart data based on current chart type
    const initialChartData = submissionDataFromSidebar.getChartData(chartType);
    setChartData(initialChartData);
    setHasChartData(true);
    
    // Auto-switch to CHART tab when data is submitted
    setTab("CHART");
    
    console.log(`Initial ${chartType} data:`, initialChartData);
    console.log("Selected row:", submissionDataFromSidebar.selectedRow);
    console.log("Form data:", submissionDataFromSidebar.formData);
  };

  // Updated function to handle chart type changes
  const handleChartTypeChange = (newChartType) => {
    setChartType(newChartType);
    
    // If we have submission data, get new chart data for the selected type
    if (submissionData) {
      const newChartData = submissionData.getChartData(newChartType);
      setChartData(newChartData);
      console.log(`New ${newChartType} data:`, newChartData);
    }
  };

  return (
    <div className="dash-root">
      <Sidebar 
        csvFilename="/data-1757995711104.csv"
        onDataSubmit={handleDataSubmit} 
      />
      <div className="dash-main">
        <Topbar tab={tab} setTab={setTab} onChatbot={() => setChatbotOpen(true)} />
        <div className="dash-content">
          <div className="left-space">
            {tab === "MAP" && (
              <MapTypeDropdown
                open={mapTypeOpen}
                setOpen={setMapTypeOpen}
                setMapType={setMapType}
                mapType={mapType}
              />
            )}

            {tab === "CHART" && (
              <ChartDropdown
                open={chartTypeOpen}
                setOpen={setChartTypeOpen}
                chartType={chartType}
                setChartType={handleChartTypeChange} // Updated to use our custom handler
              />
            )}

            <MainPanel 
              tab={tab} 
              chartType={chartType}
              chartData={chartData}
              hasChartData={hasChartData}
              formData={formData}
              selectedRow={selectedRow} // Pass selected row data
            />
          </div>

          <ActionsPanel
            chatbotOpen={chatbotOpen}
            setChatbotOpen={setChatbotOpen}
            chartType={chartType}
            setChartType={handleChartTypeChange} // Updated to use our custom handler
          />

          {chatbotOpen && (
            <ChatbotSidebar
              messages={messages}
              setChatbotOpen={setChatbotOpen}
              handleSend={handleSend}
            />
          )}
        </div>
      </div>
    </div>
  );
}