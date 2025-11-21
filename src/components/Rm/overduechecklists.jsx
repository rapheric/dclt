// src/components/checklists/OverdueChecklistsTable.jsx
import React, { useMemo } from "react";
import { Table, Tag, Progress, Typography } from "antd";

const { Title } = Typography;

// ----------------- MOCK DATA -----------------
const mockChecklists = [
  {
    id: "LN001",
    customerName: "John Doe",
    loanType: "Mortgage",
    totalDocs: 6,
    pendingDocs: 2,
    status: "Pending",
    deadline: "2025-01-10",
    rm: "Alice",
  },
  {
    id: "LN002",
    customerName: "Mary Jane",
    loanType: "Sme Loan",
    totalDocs: 4,
    pendingDocs: 1,
    status: "Deferred",
    deadline: "2025-02-10",
    rm: "Bob",
  },
  {
    id: "LN003",
    customerName: "Peter Parker",
    loanType: "Mortgage",
    totalDocs: 5,
    pendingDocs: 0,
    status: "Completed",
    deadline: "2024-12-01",
    rm: "Alice",
  },
  {
    id: "LN004",
    customerName: "Bruce Wayne",
    loanType: "Asset Finance",
    totalDocs: 7,
    pendingDocs: 3,
    status: "Pending",
    deadline: "2025-01-05",
    rm: "Kevin",
  },
];

const OverdueChecklistsTable = () => {
  // TODAY DATE
  const today = new Date();

  // FILTER OUT OVERDUE ITEMS
  const overdueData = useMemo(() => {
    return mockChecklists.filter((item) => {
      const deadline = new Date(item.deadline);
      return deadline < today && item.status !== "Completed";
    });
  }, []);

  const columns = [
    {
      title: "Loan No",
      dataIndex: "id",
      width: 110,
      render: (t) => <span style={{ fontSize: 12 }}>{t}</span>,
    },
    {
      title: "Customer",
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
      title: "Progress",
      width: 130,
      render: (_, row) => {
        const percent = Math.round(
          ((row.totalDocs - row.pendingDocs) / row.totalDocs) * 100
        );
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: "Pending",
      dataIndex: "pendingDocs",
      width: 80,
      render: (val) => <Tag color="orange">{val}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (s) => {
        let color = "blue";
        if (s === "Deferred") color = "orange";
        if (s === "Pending") color = "red";

        return <Tag color={color}>{s}</Tag>;
      },
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      width: 120,
      render: (date) => (
        <span style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>
          {date}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <Title level={4} style={{ marginBottom: 15, color: "#cc0000" }}>
        🔥 Overdue Checklists (SLA Breached)
      </Title>

      <Table
        size="small"
        columns={columns}
        dataSource={overdueData}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default OverdueChecklistsTable;
