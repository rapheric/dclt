
// // export default ChecklistModal;
// import React, { useState } from "react";
// import {
//   Drawer,
//   Input,
//   Table,
//   Button,
//   Space,
//   Select,
//   Tag,
//   Upload,
//   message,
// } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

// const { Search } = Input;
// const { Option } = Select;

// // Mock CRM Customer Data
// const customers = [
//   {
//     id: 1,
//     name: "John Mwangi",
//     loanType: "Equity Release Loan",
//     rmName: "Alice Wanjiku",
//     rmEmail: "alice.wanjiku@ncba.com",
//   },
//   {
//     id: 2,
//     name: "Grace Achieng",
//     loanType: "Shamba Loan",
//     rmName: "David Otieno",
//     rmEmail: "david.otieno@ncba.com",
//   },
// ];

// // Mock Loan Document Templates
// const loanDocuments = {
//   "Equity Release Loan": [
//     { category: "Contract", name: "Duly executed facility letter", status: "Pending" },
//     { category: "KYC", name: "Borrower's ID & PIN", status: "Pending" },
//     { category: "Security", name: "First Legal Charge", status: "Pending" }
//   ],
//   "Shamba Loan": [
//     { category: "Contract", name: "Offer Letter", status: "Pending" },
//     { category: "KYC", name: "Copy of ID/Passport", status: "Pending" }
//   ],
// };

// const ChecklistModal = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [checklists, setChecklists] = useState([]);

//   // Drawer controls
//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => {
//     setOpen(false);
//     setSelectedCustomer(null);
//     setDocuments([]);
//     setFilterStatus("All");
//   };

//   // Search Customer
//   const handleSearch = (value) => {
//     const customer = customers.find((c) =>
//       c.name.toLowerCase().includes(value.toLowerCase())
//     );

//     if (customer) {
//       setSelectedCustomer(customer);
//       setDocuments(loanDocuments[customer.loanType]);
//     } else {
//       setSelectedCustomer(null);
//       setDocuments([]);
//     }
//   };

//   // Add Custom Document
//   const handleAddDocument = () => {
//     setDocuments([
//       ...documents,
//       { name: "", category: "Custom", status: "Pending", comment: "" }
//     ]);
//   };

//   // Update Document Name
//   const handleEditName = (index, value) => {
//     const updated = [...documents];
//     updated[index].name = value;
//     setDocuments(updated);
//   };

//   // Update Comment
//   const handleComment = (index, value) => {
//     const updated = [...documents];
//     updated[index].comment = value;
//     setDocuments(updated);
//   };

//   // Change Status
//   const handleStatusChange = (index, status) => {
//     const updated = [...documents];
//     updated[index].status = status;
//     setDocuments(updated);
//   };

//   // Upload
//   const handleUpload = (file) => {
//     message.success(`${file.name} uploaded successfully`);
//     return false;
//   };

//   // Save checklist + send to RM
//   const handleSubmitChecklist = () => {
//     if (!selectedCustomer) return;

//     const checklistRecord = {
//       id: Date.now(),
//       customer: selectedCustomer.name,
//       loanType: selectedCustomer.loanType,
//       rm: selectedCustomer.rmName,
//       email: selectedCustomer.rmEmail,
//       documents,
//       status: "Sent to RM"
//     };

//     setChecklists([...checklists, checklistRecord]);

//     message.success(`Checklist sent to RM: ${selectedCustomer.rmName}`);

//     closeDrawer();
//   };

//   // Filtered Documents
//   const filteredDocs =
//     filterStatus === "All"
//       ? documents
//       : documents.filter((d) => d.status === filterStatus);

//   const columns = [
//     {
//       title: "Document",
//       dataIndex: "name",
//       render: (text, record, index) => (
//         <Input
//           value={text}
//           placeholder="Document name"
//           onChange={(e) => handleEditName(index, e.target.value)}
//         />
//       ),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (status, record, index) => (
//         <Select
//           value={status}
//           onChange={(value) => handleStatusChange(index, value)}
//           style={{ width: 120 }}
//         >
//           <Option value="Pending">Pending</Option>
//           <Option value="Submitted">Submitted</Option>
//           <Option value="Deferred">Deferred</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Upload",
//       render: () => (
//         <Upload beforeUpload={handleUpload} showUploadList={false}>
//           <Button icon={<UploadOutlined />}>Upload</Button>
//         </Upload>
//       ),
//     },
//     {
//       title: "Comment",
//       render: (record, _, index) => (
//         <Input
//           placeholder="Add comment"
//           onChange={(e) => handleComment(index, e.target.value)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div>
//       {/* Open Drawer Button */}
//       <Button type="primary" onClick={openDrawer}>
//         Create Checklist
//       </Button>

//       {/* Drawer Side Modal */}
//       <Drawer
//         title="Create Loan Checklist"
//         placement="right"
//         width={650}
//         onClose={closeDrawer}
//         open={open}
//       >
//         <Space direction="vertical" style={{ width: "100%" }}>
//           {/* Search Customer */}
//           <Search
//             placeholder="Search customer by name"
//             enterButton="Search"
//             onSearch={handleSearch}
//             allowClear
//           />

//           {/* Customer Info */}
//           {selectedCustomer && (
//             <div>
//               <p><b>Customer:</b> {selectedCustomer.name}</p>
//               <p><b>Loan Type:</b> {selectedCustomer.loanType}</p>
//               <p><b>RM:</b> {selectedCustomer.rmName}</p>
//               <p><b>RM Email:</b> {selectedCustomer.rmEmail}</p>

//               {/* Filter */}
//               <Select
//                 value={filterStatus}
//                 onChange={setFilterStatus}
//                 style={{ width: 200, marginBottom: 10 }}
//               >
//                 <Option value="All">All Documents</Option>
//                 <Option value="Pending">Pending</Option>
//                 <Option value="Submitted">Submitted</Option>
//                 <Option value="Deferred">Deferred</Option>
//               </Select>

//               {/* Add Doc */}
//               <Button
//                 type="dashed"
//                 onClick={handleAddDocument}
//                 icon={<PlusOutlined />}
//                 style={{ marginBottom: 12 }}
//               >
//                 Add Document
//               </Button>

//               {/* Documents Table */}
//               <Table
//                 dataSource={filteredDocs.map((doc, i) => ({ ...doc, key: i }))}
//                 columns={columns}
//                 pagination={false}
//               />

//               <Button
//                 type="primary"
//                 style={{ marginTop: 20, width: "100%" }}
//                 onClick={handleSubmitChecklist}
//               >
//                 Submit Checklist to RM
//               </Button>
//             </div>
//           )}
//         </Space>
//       </Drawer>

//       {/* Checklist Table (History) */}
//       <h2 style={{ marginTop: 30 }}>Created Checklists</h2>

//       <Table
//         dataSource={checklists.map((c) => ({ ...c, key: c.id }))}
//         columns={[
//           { title: "Customer", dataIndex: "customer" },
//           { title: "Loan Type", dataIndex: "loanType" },
//           { title: "RM", dataIndex: "rm" },
//           { title: "Status", dataIndex: "status", render: (text) => <Tag color="blue">{text}</Tag> },
//         ]}
//       />
//     </div>
//   );
// };

// export default ChecklistModal;


