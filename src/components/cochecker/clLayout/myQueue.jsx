// src/components/cochecker/clLayout/MyQueue.jsx
import React, { useEffect, useState } from "react";
import { Table, Input, Select, Button, message } from "antd";
import axios from "axios";

const { Option } = Select;

const MyQueue = ({ showCompletedOnly = false }) => {
  const [dcls, setDcls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [rmFilter, setRmFilter] = useState("");

  // Fetch pending DCLs from backend
  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/dcls"); // your backend endpoint
      let data = res.data;

      if (!Array.isArray(data)) {
        data = []; // safeguard in case backend returns a single object
      }

      // Filter by status
      if (showCompletedOnly) {
        data = data.filter((dcl) => dcl.status === "Approved");
      } else {
        data = data.filter((dcl) => dcl.status === "PendingChecker");
      }

      // Filter by RM if selected
      if (rmFilter) {
        data = data.filter((dcl) => dcl.rmId === rmFilter);
      }

      // Search filter
      if (search) {
        data = data.filter(
          (dcl) =>
            dcl.customerNumber?.toLowerCase().includes(search.toLowerCase()) ||
            dcl.dclNumber?.toLowerCase().includes(search.toLowerCase())
        );
      }

      setDcls(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch DCLs from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [search, rmFilter, showCompletedOnly]);

  // Approve DCL
  const approveDCL = async (dclId) => {
    try {
      await axios.patch(`/api/dcls/${dclId}/approve`);
      message.success("DCL approved!");
      fetchQueue();
    } catch (err) {
      console.error(err);
      message.error("Failed to approve DCL");
    }
  };

  // Return DCL
  const returnDCL = async (dclId) => {
    try {
      await axios.patch(`/api/dcls/${dclId}/return`);
      message.success("DCL returned to CO Officer");
      fetchQueue();
    } catch (err) {
      console.error(err);
      message.error("Failed to return DCL");
    }
  };

  const columns = [
    { title: "DCL Number", dataIndex: "dclNumber", key: "dclNumber" },
    { title: "Customer", dataIndex: "customerName", key: "customerName" },
    { title: "RM", dataIndex: "rmName", key: "rmName" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        !showCompletedOnly && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              type="primary"
              onClick={() => approveDCL(record._id)}
            >
              Approve
            </Button>
            <Button
              type="default"
              danger
              onClick={() => returnDCL(record._id)}
            >
              Return
            </Button>
          </div>
        ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Input
          placeholder="Search by DCL or Customer number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Filter by RM"
          value={rmFilter || undefined}
          onChange={setRmFilter}
          style={{ width: 200 }}
          allowClear
        >
          {/* Replace these options dynamically if needed */}
          <Option value="RM001">RM001</Option>
          <Option value="RM002">RM002</Option>
        </Select>
        <Button onClick={fetchQueue}>Refresh</Button>
      </div>

      <Table
        dataSource={dcls}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </div>
  );
};

export default MyQueue;
