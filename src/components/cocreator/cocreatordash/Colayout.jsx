import React, { useState } from "react";
import { Menu } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  BellOutlined,
} from "@ant-design/icons";

import ChecklistDrawerCO from "../checklists/ChecklistDrawerCO";
import MyQueue from "../checklists/MyQueue";
import DeferredChecklists from "../checklists/DeferredChecklists";
import CompletedChecklists from "../checklists/CompletedChecklists";
import CombinedCharts from "../../stats";

const Sidebar = ({ selectedKey, setSelectedKey, collapsed, toggleCollapse }) => {
  const handleClick = (e) => setSelectedKey(e.key);

  return (
    <div style={{ width: collapsed ? 80 : 250, background: "#3A2A82", paddingTop: 20, color: "white" }}>
      <h2 style={{ textAlign: "center", fontSize: 22, marginBottom: 35, fontWeight: "bold" }}>
        {collapsed ? "N" : "CO Creator Dashboard"}
      </h2>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        inlineCollapsed={collapsed}
        items={[
          { key: "create-checklist", icon: <FileTextOutlined />, label: "Create Checklist" },
          { key: "my-queue", icon: <ClockCircleOutlined />, label: "My Queue" },
          { key: "deferrals", icon: <ClockCircleOutlined />, label: "Deferrals" },
          { key: "completed", icon: <CheckCircleOutlined />, label: "Completed" },
          { key: "reports", icon: <SettingOutlined />, label: "Reports" },
        ]}
      />

      <div style={{ position: "absolute", bottom: 20, width: "100%", textAlign: "center" }}>
        <button
          onClick={toggleCollapse}
          style={{ background: "#fff", color: "#3A2A82", border: "none", borderRadius: 4, padding: "5px 10px" }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => (
  <div
    style={{
      height: 60,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}
  >
    <MenuOutlined style={{ fontSize: 24, cursor: "pointer" }} onClick={toggleSidebar} />
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
    </div>
  </div>
);

const MainLayout = () => {
  const [selectedKey, setSelectedKey] = useState("create-checklist");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const [newChecklist, setNewChecklist] = useState(null);

  const handleChecklistCreated = (cl) => {
    setNewChecklist(cl); // pass new checklist to MyQueue
    setSelectedKey("my-queue");
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "create-checklist":
        return <ChecklistDrawerCO onChecklistCreated={handleChecklistCreated} />;
      case "my-queue":
        return <MyQueue newChecklist={newChecklist} />;
      case "deferrals":
        return <DeferredChecklists />;
      case "completed":
        return <CompletedChecklists />;
      case "reports":
        return <CombinedCharts />;
      default:
        return <h1>Select a section</h1>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div style={{ padding: 20, flex: 1, overflowY: "auto", background: "#f0f2f5" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
