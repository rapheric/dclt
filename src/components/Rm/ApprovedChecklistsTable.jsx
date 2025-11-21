import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Space, Button, Drawer, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title, Text } = Typography;

// ---------------- MOCK DATA ----------------
const approvedChecklistsMock = [
  {
    id: "LN1001",
    customerName: "Samuel Kariuki",
    loanType: "Mortgage",
    totalDocs: 12,
    submittedDocs: 12,
    approvedByCO: true,
    status: "Approved",
    rm: "Anne W.",
    approvalDate: "2025-02-20",
    checklist: [
      { name: "ID Copy", status: "Submitted" },
      { name: "Bank Statements", status: "Submitted" },
      { name: "Pay Slips", status: "Submitted" },
    ],
  },
  {
    id: "LN1002",
    customerName: "Jane Wanjiru",
    loanType: "SME Loan",
    totalDocs: 8,
    submittedDocs: 8,
    approvedByCO: true,
    status: "Approved",
    rm: "Anne W.",
    approvalDate: "2025-02-18",
    checklist: [
      { name: "CR12", status: "Submitted" },
      { name: "KRA Pin", status: "Submitted" },
    ],
  },
];

const ApprovedChecklistsTable = () => {
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  // ---------------- FILTER LOGIC ----------------
  const filtered = useMemo(() => {
    return approvedChecklistsMock.filter((item) => {
      const s = search.toLowerCase();
      return (
        item.customerName.toLowerCase().includes(s) ||
        item.id.toLowerCase().includes(s)
      );
    });
  }, [search]);

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    {
      title: "Loan Number",
      dataIndex: "id",
      width: 130,
      render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 160,
      render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      width: 130,
      render: (t) => <Tag color="purple">{t}</Tag>,
    },
    {
      title: "Docs Submitted",
      width: 140,
      render: (_, row) => (
        <Tag color="green">
          {row.submittedDocs}/{row.totalDocs}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 110,
      render: (s) => <Tag color="green">{s}</Tag>,
    },
    {
      title: "Approved On",
      dataIndex: "approvalDate",
      width: 130,
      render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
    },
    {
      title: "Action",
      width: 110,
      render: (_, row) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedChecklist(row);
            setOpenDrawer(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  // ---------------- RENDER ----------------
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <Title level={4}>Approved Checklists</Title>

      <Space style={{ marginBottom: 12 }}>
        <Search
          placeholder="Search by Loan / Customer"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </Space>

      <Table
        size="small"
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />

      {/* DRAWER WITH CHECKLIST DETAILS */}
      <Drawer
        open={openDrawer}
        width={420}
        onClose={() => setOpenDrawer(false)}
        title={`Checklist – ${selectedChecklist?.customerName}`}
      >
        {selectedChecklist && (
          <>
            <Text strong>Loan Number:</Text> {selectedChecklist.id}
            <br />
            <Text strong>Loan Type:</Text> {selectedChecklist.loanType}
            <br />
            <Text strong>Approved On:</Text> {selectedChecklist.approvalDate}
            <br />

            <Title level={5} style={{ marginTop: 15 }}>
              Documents Submitted
            </Title>

            {selectedChecklist.checklist.map((doc) => (
              <div
                key={doc.name}
                className="flex justify-between py-1 border-b text-sm"
              >
                <span>{doc.name}</span>
                <Tag color="green">{doc.status}</Tag>
              </div>
            ))}

            <Title level={5} style={{ marginTop: 20 }}>
              Status: <Tag color="green">Approved</Tag>
            </Title>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default ApprovedChecklistsTable;
