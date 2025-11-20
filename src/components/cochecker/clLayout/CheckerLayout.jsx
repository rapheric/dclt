
import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
// import CombinedCharts from "../../stats";
// import Creatchecklistpage from "../creatorpage";
// import CompletedChecklists from "../checklists/CompletedChecklists";
// import DeferredChecklists from "../checklists/DeferredChecklists";
// import ActiveChecklists from "../checklists/ActiveChecklists";
// import CheckListPage from "../pages/CheckListPage";
// // import ChecklistModal from "../checklists/ChecklistModal";
// import ChecklistDrawerCO from "../checklists/ChecklistDrawerCO";
// import ChecklistActionDrawerRM from "../checklists/ChecklistActionDrawerRM";
// import ChecklistTableCO from "../checklists/ChecklistTableCO";
// import ChecklistTableRM from "../checklists/ChecklistTableRM";
// import COChecklistPage from "../checklists/COChecklistPage";
// import RMChecklistPage from "../checklists/RMChecklistPage";
// import DashboardCo from "../checklists/dashboard";

// Sidebar Component
const Sidebar = ({
  selectedKey,
  setSelectedKey,
  collapsed,
  toggleCollapse,
}) => {
  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 250,
        background: "#3A2A82",
        paddingTop: 20,
        transition: "width 0.2s",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: 22,
          marginBottom: 35,
          fontWeight: "bold",
        }}
      >
        {collapsed ? "N" : "CO creator Dashboard"}
      </h2>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleClick}
        style={{ background: "#3A2A82" }}
        inlineCollapsed={collapsed}
        items={[
          { key: "dashboard", icon: <HomeOutlined />, label: "Dashboard" },
          {
            key: "checklists",
            icon: <FileTextOutlined />,
            label: "Checklists",
          },
          {
            key: "deffered",
            icon: <ClockCircleOutlined />,
            label: "deffered",
          },
          {
            key: "completed",
            icon: <CheckCircleOutlined />,
            label: "Completed",
          },
          { key: "reports", icon: <SettingOutlined />, label: "Reports" },
          {
            key: "active",
            icon: <ClockCircleOutlined />,
            label: "Active",
          },
          {
            key: "create checklist",
            icon: <ClockCircleOutlined />,
            label: "create checklist",
          },
          {
            key: "rm checklist",
            icon: <ClockCircleOutlined />,
            label: "rm checklist",
          },
          {
            key: "co checklist",
            icon: <ClockCircleOutlined />,
            label: "co checklist",
          },
        ]}
      />

      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
        }}
      >
        <button
          onClick={toggleCollapse}
          style={{
            background: "#fff",
            color: "#3A2A82",
            border: "none",
            borderRadius: 4,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ toggleSidebar }) => {
  return (
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
      <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
        <MenuOutlined style={{ fontSize: 24 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      </div>
    </div>
  );
};

// Main Layout Component
const CheckerLayout = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (selectedKey) {
        case "dashboard":
         return <h1>work on progress</h1>
      case "active":
        return <h1>work on progress</h1>
      case "c":
       return <h1>work on progress</h1>
      case "completed":
        return <h1>work on progress</h1>
      case "create checklist":
        // return <ChecklistModal/>
        return <h1>work on progress</h1>
      case "rms":
      return <h1>work on progress</h1>  
      case "rm checklistdrawer":
        return <h1>work on progress</h1>
      case "co checklist":
       return <h1>work on progress</h1>
      case "rm checklist":
        return <h1>work on progress</h1>
      case "reports":
        return <h1>work on progress</h1>
      default:
        return <h1>Dashboard Content</h1>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
            padding: 20,
            flex: 1,
            overflowY: "auto",
            background: "#f0f2f5",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CheckerLayout;
