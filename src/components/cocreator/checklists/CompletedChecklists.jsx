
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
          { name: "Address Proof", status: "Submitted" },
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
          { name: "ID Proof", status: "Submitted" },
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
    rmId: null,
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Deferred" },
          { name: "Income Proof", status: "Submitted" },
        ],
      },
    ],
  },
];

const CompletedChecklists = () => {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [rmFilter, setRmFilter] = useState(null);
  const [searchText, setSearchText] = useState("");

  const checklists = MOCK_CHECKLISTS;

  // Filter to show only checklists where **all documents are Submitted**
  const completedData = useMemo(() => {
    return checklists.filter((item) => {
      const docs = item.categories?.[0]?.documents || [];
      return docs.length > 0 && docs.every((d) => d.status === "Submitted");
    });
  }, [checklists]);

  const filteredData = useMemo(() => {
    return completedData
      .filter((item) =>
        searchText
          ? item.applicantName.toLowerCase().includes(searchText.toLowerCase())
          : true
      )
      .filter((item) => (rmFilter ? item.rmId?._id === rmFilter : true));
  }, [completedData, searchText, rmFilter]);

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
      render: (type) => <Tag color="green">{type}</Tag>,
    },
    {
      title: "Progress",
      render: () => <Progress percent={100} size="small" />,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (d) => new Date(d).toLocaleString(),
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

  const expandedRowRender = (row) => {
    const docs = row.categories?.[0]?.documents || [];
    return (
      <div className="p-3 bg-gray-50 rounded">
        <strong className="block mb-2">Documents</strong>
        {docs.map((d) => (
          <div key={d.name} className="flex justify-between border-b py-1">
            <span>{d.name}</span>
            <Tag color="green">{d.status}</Tag>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
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
      </Space>

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

      {/* <ChecklistModal checklistId={selectedId} onClose={() => setSelectedId(null)} /> */}
    </div>
  );
};

export default CompletedChecklists;
