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

  // New states for chart data integration
  const [chartData, setChartData] = useState([]);
  const [hasChartData, setHasChartData] = useState(false);
  const [formData, setFormData] = useState({});

  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
    { from: "user", text: "I need help with the map visualization" },
    { from: "bot", text: "I can help you with that! What specific information are you looking for?" }
  ]);

  const handleSend = (msg) => {
    if (msg) setMessages([...messages, { from: "user", text: msg }]);
  };

  // New function to handle data submission from sidebar
  const handleDataSubmit = (data, submittedFormData) => {
    setChartData(data);
    setHasChartData(true);
    setFormData(submittedFormData);
    setTab("CHART"); // Auto-switch to CHART tab when data is submitted
    console.log("Data submitted:", data);
    console.log("Form data:", submittedFormData);
  };

  return (
    <div className="dash-root">
      <Sidebar onDataSubmit={handleDataSubmit} />
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
                setChartType={setChartType}
              />
            )}

            <MainPanel 
              tab={tab} 
              chartType={chartType}
              chartData={chartData}
              hasChartData={hasChartData}
              formData={formData}
            />
          </div>

          <ActionsPanel
            chatbotOpen={chatbotOpen}
            setChatbotOpen={setChatbotOpen}
            chartType={chartType}
            setChartType={setChartType}
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