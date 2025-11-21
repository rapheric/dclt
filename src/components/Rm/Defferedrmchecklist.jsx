import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Space, Button, Drawer, Typography } from "antd";
import { EyeOutlined, WarningOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title, Text } = Typography;

// ---------------- MOCK DATA ----------------
const deferredMock = [
  {
    id: "LN3001",
    customerName: "Peter Mwangi",
    loanType: "Business Loan",
    totalDocs: 10,
    submittedDocs: 7,
    deferredDocs: 3,
    status: "Deferred – Pending CO Approval",
    rm: "Anne W.",
    dateRequested: "2025-02-19",
    deferredList: [
      { name: "CR12", reason: "Customer to update CR12" },
      { name: "Company PIN", reason: "Not valid – needs renewal" },
      { name: "Director KRA PIN", reason: "Missing" },
    ],
    submittedList: [
      { name: "Bank Statements", status: "Submitted" },
      { name: "ID Copy", status: "Submitted" },
      { name: "Business Permit", status: "Submitted" },
    ],
  },
  {
    id: "LN3002",
    customerName: "Lydia Achieng",
    loanType: "Mortgage",
    totalDocs: 12,
    submittedDocs: 9,
    deferredDocs: 3,
    status: "Deferred – Pending CO Approval",
    rm: "Anne W.",
    dateRequested: "2025-02-17",
    deferredList: [
      { name: "Valuation Report", reason: "Report outdated" },
      { name: "KRA PIN", reason: "Mismatch with ID" },
      { name: "Payslip", reason: "Unreadable" },
    ],
    submittedList: [
      { name: "Offer Letter", status: "Submitted" },
      { name: "Sale Agreement", status: "Submitted" },
    ],
  },
];

const DeferredChecklistsTable = () => {
  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState(null);

  // ---------------- FILTER LOGIC ----------------
  const filtered = useMemo(() => {
    return deferredMock.filter((item) => {
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
      width: 120,
      render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 150,
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
      width: 120,
      render: (_, row) => (
        <Tag color="blue">
          {row.submittedDocs}/{row.totalDocs}
        </Tag>
      ),
    },
    {
      title: "Deferred Docs",
      dataIndex: "deferredDocs",
      width: 120,
      render: (count) => <Tag color="orange">{count}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 180,
      render: (s) => (
        <Tag color="orange" icon={<WarningOutlined />}>
          {s}
        </Tag>
      ),
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
      width: 130,
      render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
    },
    {
      title: "Action",
      width: 100,
      render: (_, row) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelected(row);
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
      <Title level={4}>Deferred Checklists (Waiting Approval)</Title>

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

      {/* DRAWER DETAILS */}
      <Drawer
        title={`Deferred Details – ${selected?.customerName}`}
        width={450}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {selected && (
          <>
            <Text strong>Loan Number:</Text> {selected.id} <br />
            <Text strong>Loan Type:</Text> {selected.loanType} <br />
            <Text strong>Date Requested:</Text> {selected.dateRequested} <br />

            <Title level={5} style={{ marginTop: 20 }}>
              Deferred Documents
            </Title>
            {selected.deferredList.map((d) => (
              <div key={d.name} className="border-b py-1 flex justify-between">
                <span>{d.name}</span>
                <Tag color="orange">{d.reason}</Tag>
              </div>
            ))}

            <Title level={5} style={{ marginTop: 20 }}>
              Submitted Documents
            </Title>
            {selected.submittedList.map((d) => (
              <div
                key={d.name}
                className="border-b py-1 flex justify-between items-center"
              >
                <span>{d.name}</span>
                <Tag color="green">{d.status}</Tag>
              </div>
            ))}

            <Title level={5} style={{ marginTop: 20 }}>
              Status:{" "}
              <Tag color="orange" icon={<WarningOutlined />}>
                Awaiting CO Approval
              </Tag>
            </Title>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default DeferredChecklistsTable;
