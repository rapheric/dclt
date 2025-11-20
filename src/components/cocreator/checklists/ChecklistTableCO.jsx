// /components/co/ChecklistTableCO.jsx
import React, { useMemo, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Select,
  Progress,
  Tooltip,
  Dropdown,
  Menu,
  Input,
  message,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
  useGetChecklistsQuery,
  useUpdateChecklistStatusMutation,
} from "../../../api/checklistApi";

const { Search } = Input;

const ChecklistTableCO = ({ onOpenDrawer }) => {
  const { data: checklists = [], isLoading } = useGetChecklistsQuery();
  const [updateChecklist] = useUpdateChecklistStatusMutation();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [rmFilter, setRmFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // ------------------------------------
  // RM Filter Options
  // ------------------------------------
  const rmOptions = Array.from(
    new Map(
      checklists
        .filter((i) => i.rmId)
        .map((i) => [
          i.rmId._id,
          {
            label: `${i.rmId.firstName} ${i.rmId.lastName}`,
            value: i.rmId._id,
          },
        ])
    ).values()
  );

  // ------------------------------------
  // Filtering + Search
  // ------------------------------------
  const filtered = useMemo(() => {
    return checklists
      .filter((item) =>
        searchText
          ? item.customerName
              ?.toLowerCase()
              .includes(searchText.toLowerCase())
          : true
      )
      .filter((item) => (rmFilter ? item.rmId?._id === rmFilter : true))
      .filter((item) => {
        if (!statusFilter) return true;

        const docs = item.documents || [];
        return docs.some((d) => d.status === statusFilter);
      });
  }, [checklists, searchText, rmFilter, statusFilter]);

  // ------------------------------------
  // Helpers
  // ------------------------------------
  const getProgress = (docs) => {
    if (!docs || docs.length === 0) return 0;
    const submitted = docs.filter((d) => d.status === "Submitted").length;
    return Math.round((submitted / docs.length) * 100);
  };

  const allSubmitted = (docs) =>
    docs.length > 0 && docs.every((d) => d.status === "Submitted");

  // ------------------------------------
  // Send to Verifier
  // ------------------------------------
  const handleSendToVerifier = async (row) => {
    if (!allSubmitted(row.documents))
      return message.error("All documents must be submitted before sending.");

    await updateChecklist({
      id: row.id,
      status: "Sent to Verifier",
    });

    message.success("Checklist sent to Verifier.");
  };

  // ------------------------------------
  // Table Columns (matches RM table design)
  // ------------------------------------
  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      render: (_, row) => (
        <div style={{ fontWeight: 600 }}>
          {row.customerName}
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            RM:{" "}
            {row.rmId
              ? `${row.rmId.firstName} ${row.rmId.lastName}`
              : "Unassigned"}
          </div>
        </div>
      ),
    },

    {
      title: "Loan Type",
      dataIndex: "loanType",
      sorter: (a, b) => a.loanType.localeCompare(b.loanType),
      render: (type) => (
        <Tag color="blue" style={{ fontWeight: 600 }}>
          {type}
        </Tag>
      ),
    },

    {
      title: "Progress",
      render: (_, row) => (
        <Progress
          percent={getProgress(row.documents)}
          size="small"
          strokeColor="#1890ff"
        />
      ),
    },

    {
      title: "Deferred Docs",
      render: (_, row) => {
        const docs = row.documents || [];
        const deferred = docs.filter((d) => d.status === "Deferred").length;

        return (
          <Tooltip title="Documents deferred by RM">
            <Tag color="orange" style={{ fontWeight: 600 }}>
              {deferred}
            </Tag>
          </Tooltip>
        );
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (st) => {
        const color =
          st === "RM Submitted"
            ? "green"
            : st === "Sent to Verifier"
            ? "purple"
            : "blue";

        return (
          <Tag color={color} style={{ fontWeight: 600 }}>
            {st}
          </Tag>
        );
      },
    },

    {
      title: "Actions",
      render: (_, row) => {
        const menu = (
          <Menu
            items={[
              {
                key: "view",
                label: "View Checklist",
                onClick: () => onOpenDrawer(row),
              },
              {
                key: "send",
                label: (
                  <span
                    style={{
                      color: !allSubmitted(row.documents) ? "#bfbfbf" : "inherit",
                    }}
                  >
                    Send to Verifier
                  </span>
                ),
                disabled: !allSubmitted(row.documents),
                onClick: () => handleSendToVerifier(row),
              },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  // ------------------------------------
  // Expanded Row — same design as RM list
  // ------------------------------------
  const expandedRowRender = (row) => (
    <div style={{ padding: 16, background: "#f9f9fb", borderRadius: 8 }}>
      <strong style={{ display: "block", marginBottom: 8 }}>Documents</strong>

      {row.documents?.map((d) => (
        <div
          key={d.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            padding: "6px 0",
          }}
        >
          <span>{d.name}</span>
          <Tag
            color={
              d.status === "Submitted"
                ? "green"
                : d.status === "Deferred"
                ? "orange"
                : "default"
            }
          >
            {d.status}
          </Tag>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Filters */}
      <Space className="mb-4" wrap>
        <Search
          placeholder="Search customer..."
          allowClear
          style={{ width: 200 }}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          allowClear
          placeholder="Filter by RM"
          style={{ width: 180 }}
          options={rmOptions}
          onChange={setRmFilter}
        />

        <Select
          allowClear
          placeholder="Filter by Status"
          style={{ width: 180 }}
          onChange={setStatusFilter}
          options={[
            { label: "Submitted", value: "Submitted" },
            { label: "Deferred", value: "Deferred" },
            { label: "Pending", value: "Pending" },
          ]}
        />
      </Space>

      {/* Table */}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={filtered.map((c) => ({ ...c, key: c.id }))}
        expandable={{ expandedRowRender }}
        pagination={{
          current: page,
          pageSize: 6,
          onChange: setPage,
        }}
        bordered
        rowClassName={(record, index) =>
          index % 2 === 0
            ? "bank-table-row-light"
            : "bank-table-row-dark"
        }
      />

      {/* Styling same as RM table */}
      <style jsx>{`
        .bank-table-row-light {
          background: #ffffff;
        }
        .bank-table-row-dark {
          background: #f5f5f7;
        }
        .ant-table-thead > tr > th {
          background: #f0f5ff !important;
          font-weight: 600;
          color: #001529;
        }
        .ant-table-tbody > tr:hover > td {
          background: #e6f7ff !important;
        }
      `}</style>
    </>
  );
};

export default ChecklistTableCO;
