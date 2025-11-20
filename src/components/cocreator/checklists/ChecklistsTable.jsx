

// export default ChecklistsTable;
// src/components/checklists/ChecklistsTable.jsx
import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Tooltip,
  Progress,
  Dropdown,
  Menu,
  message,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
// import ChecklistModal from "./ChecklistModal";

const { Search } = Input;

// ---------- MOCKED DATA ----------
const MOCK_CHECKLISTS = [
  {
    _id: "1",
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm1", firstName: "John", lastName: "Mwangi" },
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Submitted" },
          { name: "Address Proof", status: "Deferred" },
        ],
      },
    ],
  },
  {
    _id: "2",
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    createdAt: new Date().toISOString(),
    rmId: { _id: "rm2", firstName: "Sarah", lastName: "Kamau" },
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Pending" },
          { name: "Income Proof", status: "Submitted" },
        ],
      },
    ],
  },
  {
    _id: "3",
    applicantName: "Charlie Davis",
    loanType: "Personal Loan",
    createdAt: new Date().toISOString(),
    rmId: null, // RM missing
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Not Actioned" },
        ],
      },
    ],
  },
];

const ChecklistsTable = () => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [rmFilter, setRmFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchText, setSearchText] = useState("");

  const checklists = MOCK_CHECKLISTS; // Using mocked data

  // -------------------------------
  // SEARCH + FILTER
  // -------------------------------
  const filteredData = useMemo(() => {
    return checklists
      .filter((item) =>
        searchText
          ? item.applicantName.toLowerCase().includes(searchText.toLowerCase())
          : true
      )
      .filter((item) => (rmFilter ? item.rmId?._id === rmFilter : true))
      .filter((item) => {
        if (!statusFilter) return true;
        const docs = item?.categories?.[0]?.documents || [];
        return docs.some((d) => d.status === statusFilter);
      });
  }, [checklists, rmFilter, statusFilter, searchText]);

  // -------------------------------
  // RM FILTER OPTIONS
  // -------------------------------
  const rmOptions = Array.from(
    new Map(
      checklists
        .filter((i) => i.rmId)
        .map((i) => [
          i.rmId._id,
          { label: `${i.rmId.firstName} ${i.rmId.lastName}`, value: i.rmId._id },
        ])
    ).values()
  );

  // -------------------------------
  // TABLE COLUMNS
  // -------------------------------
  const columns = [
    {
      title: "Applicant",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
      render: (_, row) => (
        <div className="font-semibold">
          {row.applicantName}
          <div className="text-xs text-gray-500">
            RM: {row.rmId ? `${row.rmId.firstName} ${row.rmId.lastName}` : "Unknown RM"}
          </div>
        </div>
      ),
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      sorter: (a, b) => a.loanType.localeCompare(b.loanType),
      render: (type) => <Tag color="purple">{type}</Tag>,
    },
    {
      title: "Progress",
      render: (_, row) => {
        const docs = row.categories?.[0]?.documents || [];
        const submitted = docs.filter((d) => d.status === "Submitted").length;
        const percent = docs.length ? Math.round((submitted / docs.length) * 100) : 0;
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: "Deferred Docs",
      render: (_, row) => {
        const docs = row.categories?.[0]?.documents || [];
        const deferred = docs.filter((d) => d.status === "Deferred").length;
        return (
          <Tooltip title="Documents requested later">
            <Tag color="orange">{deferred}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (d) => new Date(d).toLocaleString(),
    },
    {
      title: "Assign",
      render: () => (
        <Select
          placeholder="Assign Credit Officer"
          style={{ width: 170 }}
          options={[
            { label: "John Mwangi", value: "john" },
            { label: "Sarah Kamau", value: "sarah" },
          ]}
        />
      ),
    },
    {
      title: "Actions",
      render: (_, row) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "view",
                  label: "View Details",
                  onClick: () => setSelectedId(row._id),
                },
                {
                  key: "approve",
                  label: "Approve",
                  onClick: () => message.success("Checklist Approved"),
                },
                {
                  key: "reject",
                  label: "Reject",
                  onClick: () => message.error("Checklist Rejected"),
                },
                {
                  key: "return",
                  label: "Return to RM",
                  onClick: () => message.warning("Returned to RM for correction"),
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />}></Button>
        </Dropdown>
      ),
    },
  ];

  // -------------------------------
  // EXPAND ROW TO SHOW DOCUMENTS
  // -------------------------------
  const expandedRowRender = (row) => {
    const docs = row.categories?.[0]?.documents || [];
    return (
      <div className="p-3 bg-gray-50 rounded">
        <strong className="block mb-2">Documents</strong>
        {docs.map((d) => (
          <div key={d.name} className="flex justify-between border-b py-1">
            <span>{d.name}</span>
            <Tag
              color={
                d.status === "Submitted"
                  ? "green"
                  : d.status === "Pending"
                  ? "gold"
                  : "default"
              }
            >
              {d.status || "Not Actioned"}
            </Tag>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Search + Filters */}
      <Space className="mb-4" wrap>
        <Search
          placeholder="Search applicant..."
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Filter by RM"
          style={{ width: 180 }}
          allowClear
          onChange={setRmFilter}
          options={rmOptions}
        />

        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 180 }}
          onChange={setStatusFilter}
          options={[
            { label: "Submitted", value: "Submitted" },
            { label: "Pending", value: "Pending" },
            { label: "Not Actioned", value: "" },
          ]}
        />
      </Space>

      {/* Table */}
      <Table
        columns={columns}
        rowKey="_id"
        expandable={{ expandedRowRender }}
        dataSource={filteredData}
        pagination={{
          current: page,
          pageSize: 6,
          onChange: setPage,
        }}
      />

      {/* Checklist Modal */}
      {/* <ChecklistModal checklistId={selectedId} onClose={() => setSelectedId(null)} /> */}
    </>
  );
};

export default ChecklistsTable;
