import React, { useMemo, useState } from "react";
import { Card, Row, Col, Table, Tag, Progress, Select, Space, Typography } from "antd";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const { Title } = Typography;

// Mock data (replace with your API)
const MOCK_CHECKLISTS = [
  {
    _id: "1",
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    rmId: { _id: "rm1", firstName: "John", lastName: "Mwangi" },
    categories: [{ documents: [{ name: "ID Proof", status: "Submitted" }, { name: "Address Proof", status: "Deferred" }] }],
  },
  {
    _id: "2",
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    rmId: { _id: "rm2", firstName: "Sarah", lastName: "Kamau" },
    categories: [{ documents: [{ name: "ID Proof", status: "Pending" }, { name: "Income Proof", status: "Submitted" }] }],
  },
  {
    _id: "3",
    applicantName: "Charlie Davis",
    loanType: "Personal Loan",
    rmId: null,
    categories: [{ documents: [{ name: "ID Proof", status: "Not Actioned" }] }],
  },
];

const STATUS_COLORS = {
  Submitted: "#52c41a",
  Pending: "#faad14",
  Deferred: "#f5222d",
  "Not Actioned": "#d9d9d9",
};

const DashboardCo = () => {
  const [statusFilter, setStatusFilter] = useState(null);

  const filtered = useMemo(() => {
    return statusFilter
      ? MOCK_CHECKLISTS.filter((c) =>
          c.categories[0].documents.some((d) => d.status === statusFilter)
        )
      : MOCK_CHECKLISTS;
  }, [statusFilter]);

  // ---------- Stats ----------
  const totalChecklists = filtered.length;
  const statusCounts = filtered.reduce((acc, checklist) => {
    checklist.categories[0].documents.forEach((doc) => {
      acc[doc.status] = (acc[doc.status] || 0) + 1;
    });
    return acc;
  }, {});

  const loanTypeCounts = filtered.reduce((acc, c) => {
    acc[c.loanType] = (acc[c.loanType] || 0) + 1;
    return acc;
  }, {});

  const checklistsByRM = filtered.reduce((acc, c) => {
    const rmName = c.rmId ? `${c.rmId.firstName} ${c.rmId.lastName}` : "Unassigned";
    acc[rmName] = (acc[rmName] || 0) + 1;
    return acc;
  }, {});

  // ---------- Charts Data ----------
  const pieData = Object.entries(statusCounts).map(([key, value]) => ({ name: key, value }));
  const loanPieData = Object.entries(loanTypeCounts).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(checklistsByRM).map(([name, value]) => ({ name, value }));

  // ---------- Table ----------
  const columns = [
    { title: "Applicant", dataIndex: "applicantName", key: "name" },
    { title: "RM", render: (_, row) => (row.rmId ? `${row.rmId.firstName} ${row.rmId.lastName}` : "Unassigned") },
    { title: "Loan Type", dataIndex: "loanType", key: "loanType" },
    {
      title: "Progress",
      render: (_, row) => {
        const docs = row.categories[0].documents;
        const submitted = docs.filter((d) => d.status === "Submitted").length;
        const percent = Math.round((submitted / docs.length) * 100);
        return <Progress percent={percent} size="small" strokeColor="#1890ff" />;
      },
    },
    {
      title: "Deferred",
      render: (_, row) => {
        const docs = row.categories[0].documents;
        const deferred = docs.filter((d) => d.status === "Deferred").length;
        return <Tag color="#fa8c16">{deferred}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Loan Checklist Dashboard</Title>

      <Space style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filter by Document Status"
          allowClear
          onChange={setStatusFilter}
          options={[
            { label: "Submitted", value: "Submitted" },
            { label: "Pending", value: "Pending" },
            { label: "Deferred", value: "Deferred" },
            { label: "Not Actioned", value: "Not Actioned" },
          ]}
        />
      </Space>

      <Row gutter={16}>
        <Col span={6}>
          <Card title="Total Checklists" bordered>
            <h2>{totalChecklists}</h2>
          </Card>
        </Col>
        <Col span={9}>
          <Card title="Document Status Distribution">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie dataKey="value" data={pieData} outerRadius={70} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={9}>
          <Card title="Loan Types Distribution">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie dataKey="value" data={loanPieData} outerRadius={70} fill="#82ca9d" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Checklists by RM">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Checklist Progress">
            <Table
              columns={columns}
              dataSource={filtered.map((c) => ({ ...c, key: c._id }))}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCo;
