import React, { useState } from "react";
import { Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { CheckCircle, FileBarChart, Settings } from "lucide-react";
import MyQueueComponent from "./MyQueue"; // the component we just created
import CombinedCharts from "../../stats";

/* ---------------------------------------------------------------------- */
/* Sidebar Component */
const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
  return (
    <div
      style={{
        width: collapsed ? 80 : 260,
        background: "#2B1C67",
        color: "white",
        transition: "0.25s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 0" : "25px 20px",
          fontSize: collapsed ? 28 : 24,
          fontWeight: "bold",
          letterSpacing: collapsed ? 2 : 1,
          textAlign: collapsed ? "center" : "left",
        }}
      >
        {collapsed ? "NC" : "NCBA Checker Portal"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={(e) => setSelectedKey(e.key)}
        style={{ background: "transparent", borderRight: "none", fontSize: 15 }}
        inlineCollapsed={collapsed}
        items={[
          {
            key: "queue",
            icon: <Settings size={20} />,
            label: "My Queue",
          },
          {
            key: "completed",
            icon: <CheckCircle size={20} />,
            label: "Completed Checklists",
          },
          {
            key: "reports",
            icon: <FileBarChart size={20} />,
            label: "Reports & Analytics",
          },
        ]}
      />

      <div style={{ marginTop: "auto", padding: 20, textAlign: "center" }}>
        <button
          onClick={toggleCollapse}
          style={{
            width: "100%",
            padding: "8px 0",
            borderRadius: 6,
            border: "none",
            background: "#fff",
            color: "#2B1C67",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Navbar Component */
const Navbar = ({ toggleSidebar }) => (
  <div
    style={{
      height: 65,
      background: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 25px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}
  >
    <MenuOutlined
      onClick={toggleSidebar}
      style={{ fontSize: 24, cursor: "pointer", color: "#2B1C67" }}
    />
    <div style={{ display: "flex", alignItems: "center", gap: 25 }}></div>
  </div>
);

/* ---------------------------------------------------------------------- */
/* Checker Layout */
const CheckerLayout = () => {
  const [selectedKey, setSelectedKey] = useState("queue");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const renderContent = () => {
    switch (selectedKey) {
      case "queue":
        return <MyQueueComponent />;
      case "completed":
        return <MyQueueComponent showCompletedOnly={true} />;
      case "reports":
        return <CombinedCharts />;
      default:
        return <MyQueueComponent />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f4f5f9",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div
          style={{
            padding: "25px",
            flex: 1,
            overflowY: "auto",
            background: "#f4f6ff",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CheckerLayout;
