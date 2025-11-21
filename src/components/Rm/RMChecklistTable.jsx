"use client"; // If using Next.js
import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Typography,
  Progress,
  Drawer,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title, Text } = Typography;

// ---------------------------------------------------------
// MOCK CHECKLIST DATA
// ---------------------------------------------------------
const mockChecklists = [
  {
    id: "LN-001",
    customerName: "John Kamau",
    rm: "Sarah Wambui",
    loanType: "Mortgage",
    totalDocs: 12,
    submittedDocs: 6,
    pendingDocs: 6,
    status: "In Progress",
    deadline: "2025-03-12",
    checklist: [
      { name: "ID Copy", status: "Submitted" },
      { name: "PIN Certificate", status: "Pending" },
      { name: "Bank Statements", status: "Submitted" },
    ],
  },
  {
    id: "LN-002",
    customerName: "Linda Mwangi",
    rm: "John Otieno",
    loanType: "Asset Finance",
    totalDocs: 8,
    submittedDocs: 3,
    pendingDocs: 5,
    status: "Pending",
    deadline: "2025-03-18",
    checklist: [
      { name: "Company CR12", status: "Pending" },
      { name: "Director KYC", status: "Pending" },
    ],
  },
  {
    id: "LN-003",
    customerName: "Peter Njoroge",
    rm: "Sarah Wambui",
    loanType: "Sme Loan",
    totalDocs: 10,
    submittedDocs: 10,
    pendingDocs: 0,
    status: "Completed",
    deadline: "2025-02-28",
    checklist: [
      { name: "Business License", status: "Submitted" },
      { name: "CRB Certificate", status: "Submitted" },
    ],
  },
];

// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------
const RmChecklistTable = () => {
  const [search, setSearch] = useState("");
  const [loanTypeFilter, setLoanTypeFilter] = useState(null);
  const [rmFilter, setRmFilter] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // ---------------------------------------------------------
  // FILTER LOGIC (React Compiler Safe - NO useMemo)
  // ---------------------------------------------------------
  const filteredData = mockChecklists.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesLoan =
      loanTypeFilter ? item.loanType === loanTypeFilter : true;

    const matchesRM = rmFilter ? item.rm === rmFilter : true;

    return matchesSearch && matchesLoan && matchesRM;
  });

  // ---------------------------------------------------------
  // TABLE COLUMNS
  // ---------------------------------------------------------
  const columns = [
    {
      title: <span style={{ fontSize: 12 }}>Loan No.</span>,
      dataIndex: "id",
      width: 110,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Customer</span>,
      dataIndex: "customerName",
      width: 150,
      render: (text) => <span style={{ fontSize: 12 }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Loan Type</span>,
      dataIndex: "loanType",
      width: 120,
      render: (text) => (
        <Tag color="purple" style={{ fontSize: 10 }}>
          {text}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontSize: 12 }}>Progress</span>,
      width: 150,
      render: (_, row) => {
        const percent = Math.round(
          (row.submittedDocs / row.totalDocs) * 100
        );
        return (
          <Progress percent={percent} size="small" strokeWidth={8} />
        );
      },
    },
    {
      title: <span style={{ fontSize: 12 }}>Pending Docs</span>,
      dataIndex: "pendingDocs",
      width: 110,
      render: (num) => (
        <Tag color="orange" style={{ fontSize: 10 }}>
          {num}
        </Tag>
      ),
    },
    {
      title: <span style={{ fontSize: 12 }}>Status</span>,
      dataIndex: "status",
      width: 120,
      render: (status) => {
        const color =
          status === "Completed"
            ? "green"
            : status === "In Progress"
            ? "blue"
            : "volcano";
        return (
          <Tag color={color} style={{ fontSize: 10 }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: <span style={{ fontSize: 12 }}>Deadline</span>,
      dataIndex: "deadline",
      width: 130,
      render: (d) => <span style={{ fontSize: 12 }}>{d}</span>,
    },
    {
      title: <span style={{ fontSize: 12 }}>Action</span>,
      width: 130,
      render: (_, row) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          type="primary"
          onClick={() => {
            setSelectedChecklist(row);
            setOpenDrawer(true);
          }}
        >
          Open
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <Title level={4} style={{ marginBottom: 15 }}>
        RM Checklist Queue
      </Title>

      {/* ------------------------------------- */}
      {/* SEARCH & FILTERS */}
      {/* ------------------------------------- */}
      <Space style={{ marginBottom: 15 }} wrap>
        <Search
          placeholder="Search customer or loan number..."
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 240 }}
        />

        <Select
          placeholder="Filter by Loan Type"
          allowClear
          style={{ width: 180 }}
          onChange={setLoanTypeFilter}
          options={[
            { label: "Mortgage", value: "Mortgage" },
            { label: "Sme Loan", value: "Sme Loan" },
            { label: "Asset Finance", value: "Asset Finance" },
          ]}
        />

        <Select
          placeholder="Filter by RM"
          allowClear
          style={{ width: 180 }}
          onChange={setRmFilter}
          options={[
            { label: "Sarah Wambui", value: "Sarah Wambui" },
            { label: "John Otieno", value: "John Otieno" },
          ]}
        />
      </Space>

      {/* ------------------------------------- */}
      {/* TABLE */}
      {/* ------------------------------------- */}
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 6 }}
      />

      {/* ------------------------------------- */}
      {/* CHECKLIST DRAWER */}
      {/* ------------------------------------- */}
      <Drawer
        width={420}
        title={`Checklist Details — ${selectedChecklist?.customerName}`}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {selectedChecklist && (
          <>
            <Text strong>Loan Type:</Text>{" "}
            {selectedChecklist.loanType}
            <br />
            <Text strong>Status:</Text>{" "}
            {selectedChecklist.status}
            <br />
            <Text strong>Total Required Docs:</Text>{" "}
            {selectedChecklist.totalDocs}
            <br />
            <Text strong>Pending Docs:</Text>{" "}
            {selectedChecklist.pendingDocs}

            <Title level={5} style={{ marginTop: 20 }}>
              Documents
            </Title>

            {selectedChecklist.checklist.map((doc) => (
              <div
                key={doc.name}
                className="flex justify-between border-b py-1 mb-1"
              >
                <span>{doc.name}</span>
                <Tag
                  color={
                    doc.status === "Submitted"
                      ? "green"
                      : doc.status === "Pending"
                      ? "orange"
                      : "default"
                  }
                  style={{ fontSize: 10 }}
                >
                  {doc.status}
                </Tag>
              </div>
            ))}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default RmChecklistTable;
