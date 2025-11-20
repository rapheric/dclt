// import React, { useState, useMemo } from "react";
// import {
//   FileText,
//   Clock,
//   AlertTriangle,
//   CheckCircle,
//   PlusCircle,
// } from "lucide-react";
// import { Modal, Select, Input, Button, List, Typography, message } from "antd";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

// import { useCreateChecklistMutation } from "../../api/checklistApi";

// import CheckListPage from "./checklistPage";

// const { Option } = Select;

// const Hero = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [createChecklist] = useCreateChecklistMutation();
//   const NCBA_BLUE = "#3A2A82";

//   const handleSaveChecklist = async (data) => {
//     if (!data.rmId) {
//       message.warning("Please select a Relationship Manager");
//       return;
//     }

//     try {
//       const payload = {
//         loanType: data.loanType,
//         applicantName: data.applicantName || "Unknown Applicant",
//         rmId: data.rmId,
//         categories: data.categories,
//       };

//       await createChecklist(payload).unwrap();
//       message.success("Checklist created successfully!");
//     } catch (error) {
//       console.error("Checklist creation failed:", error);
//       message.error("Failed to create checklist");
//     }
//   };

//   const DocumentChecklistModal = ({ open, onClose, onSave }) => {
//     const [loanType, setLoanType] = useState("");
//     const [rmId, setRmId] = useState("");
//     const [customDocs, setCustomDocs] = useState([]);
//     const [customDocInput, setCustomDocInput] = useState("");

//     const defaultDocuments = {
//       mortgage: [
//         "Proof of income",
//         "Credit report",
//         "Property appraisal",
//         "Identification documents",
//       ],
//       "Sme loan": [
//         "Business financial statements",
//         "Asset purchase invoice",
//         "Bank statements",
//         "Identification documents",
//       ],
//     };

//     const documents = useMemo(() => {
//       const defaults = loanType ? defaultDocuments[loanType] : [];
//       return [...defaults, ...customDocs];
//     }, [loanType, customDocs]);

//     const addCustomDoc = () => {
//       const trimmed = customDocInput.trim();
//       if (!trimmed || documents.includes(trimmed)) return;

//       setCustomDocs([...customDocs, trimmed]);
//       setCustomDocInput("");
//     };

//     const deleteDoc = (doc) => {
//       setCustomDocs(customDocs.filter((d) => d !== doc));
//     };

//     const saveModal = () => {
//       if (!loanType) {
//         message.warning("Please select a loan type");
//         return;
//       }
//       if (!rmId) {
//         message.warning("Please select a Relationship Manager");
//         return;
//       }

//       const formattedDocs = documents.map((d) => ({
//         name: d,
//         status: "",
//         comment: "",
//         fileUrl: null,
//       }));

//       onSave({
//         loanType,
//         rmId,
//         categories: [
//           {
//             title: `${loanType} Required Documents`,
//             documents: formattedDocs,
//           },
//         ],
//       });

//       onClose();
//       setLoanType("");
//       setRmId("");
//       setCustomDocs([]);
//       setCustomDocInput("");
//     };

//     return (
//       <Modal
//         title="Create New Document Checklist"
//         open={open}
//         onCancel={onClose}
//         onOk={saveModal}
//         okText="Save Checklist"
//         width={600}
//       >
//         <div className="mb-6">
//           <Typography.Text className="block mb-2 text-gray-600 font-semibold">
//             Select Loan Type
//           </Typography.Text>
//           <Select
//             value={loanType}
//             onChange={setLoanType}
//             placeholder="Select loan type"
//             style={{ width: "100%" }}
//           >
//             <Option value="mortgage">Mortgage</Option>
//             <Option value="Sme loan">Sme Loan</Option>
//           </Select>
//         </div>

//         <div className="mb-6">
//           <Typography.Text className="block mb-2 text-gray-600 font-semibold">
//             Select Relationship Manager
//           </Typography.Text>

//           <Select
//             value={rmId}
//             onChange={setRmId}
//             placeholder="Select RM"
//             style={{ width: "100%" }}
//           > 
//           </Select>
//         </div>

//         {/* Required Documents */}
//         <div className="mb-6">
//           <Typography.Text className="block mb-2 font-semibold">
//             Required Documents
//           </Typography.Text>
//           <List
//             bordered
//             dataSource={documents}
//             renderItem={(item) => (
//               <List.Item className="flex justify-between">
//                 <span>{item}</span>
//                 {customDocs.includes(item) && (
//                   <DeleteOutlined
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => deleteDoc(item)}
//                   />
//                 )}
//               </List.Item>
//             )}
//           />
//         </div>
//         <div className="flex gap-2">
//           <Input
//             placeholder="Add custom document"
//             value={customDocInput}
//             onChange={(e) => setCustomDocInput(e.target.value)}
//             onPressEnter={addCustomDoc}
//           />
//           <Button type="primary" icon={<PlusOutlined />} onClick={addCustomDoc}>
//             Add
//           </Button>
//         </div>
//       </Modal>
//     );
//   };

//   return (
//     <section className="bg-[#F4F7FC] px-6 py-6 rounded-xl shadow-sm animate-fadeIn">
//       <div className="mt-4">
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-5 py-2.5 rounded-lg text-white shadow-md font-medium flex items-center gap-2 transition"
//           style={{ backgroundColor: NCBA_BLUE }}
//         >
//           <PlusCircle size={18} />
//           Create New Document Checklist
//         </button>
//       </div>
//       <div>
//         <CheckListPage />
//       </div>

//       <DocumentChecklistModal
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         onSave={handleSaveChecklist}
//       />
//     </section>
//   );
// };

// export default Hero;

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
// // import Creatchecklistpage from "../creatorpage";
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
const CheckerLayout = ({
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
const MainLayout = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (selectedKey) {
        case "dashboard":
          return <h1>dashboard</h1>;
      case "active":
     return <h1>dashboard</h1>;
      case "c":
         return <h1>dashboard</h1>;
      case "completed":
         return <h1>dashboard</h1>;
      case "create checklist":
        // return <ChecklistModal/>
         return <h1>dashboard</h1>;
      case "rms":
          return <h1>dashboard</h1>; 
      case "rm checklistdrawer":
         return <h1>dashboard</h1>;
      case "co checklist":
         return <h1>dashboard</h1>;
      case "rm checklist":
         return <h1>dashboard</h1>;
      case "reports":
         return <h1>dashboard</h1>;
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
