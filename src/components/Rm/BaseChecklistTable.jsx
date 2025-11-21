import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Drawer,
  Progress,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

// --------------------------------------------------------
// MOCK DATA (RM sees items assigned to them)
// --------------------------------------------------------
const mockChecklists = [
  {
    id: "LN001",
    customerName: "John Doe",
    loanType: "Mortgage",
    totalDocs: 6,
    pendingDocs: 2,
    status: "Pending",
    deadline: "2025-12-01",
    rm: "Alice",
    categories: [
      { name: "Proof of income", status: "Pending", file: null },
      { name: "Credit report", status: "Pending", file: null },
      { name: "Bank Statements", status: "Submitted", file: "bank.pdf" },
    ],
  },
  {
    id: "LN002",
    customerName: "Mary Jane",
    loanType: "Sme Loan",
    totalDocs: 4,
    pendingDocs: 1,
    status: "Deferred",
    rm: "Bob",
    deadline: "2025-12-10",
    categories: [
      { name: "Business license", status: "Submitted", file: "license.pdf" },
      { name: "Financial statements", status: "Pending", file: null },
    ],
  },
];

const BaseChecklistTableRm = () => {
  const [search, setSearch] = useState("");
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // FILTERING
  const filteredData = useMemo(() => {
    return mockChecklists.filter((item) => {
      const s = search.toLowerCase();
      return (
        item.customerName.toLowerCase().includes(s) ||
        item.id.toLowerCase().includes(s)
      );
    });
  }, [search]);

  // OPEN RM DRAWER
  const openRMDashboard = (record) => {
    setSelectedChecklist({ ...record }); // Copy so state doesn't mutate main list
    setDrawerVisible(true);
  };

  // HANDLE DOCUMENT UPLOAD
  const handleUpload = (file, docName) => {
    const updated = { ...selectedChecklist };

    updated.categories = updated.categories.map((d) =>
      d.name === docName ? { ...d, file: file.name, status: "Submitted" } : d
    );

    // Recalculate pending docs
    updated.pendingDocs = updated.categories.filter(
      (d) => d.status !== "Submitted"
    ).length;

    setSelectedChecklist(updated);

    message.success(`${docName} uploaded successfully!`);

    return false; // Prevent actual upload
  };

  // MARK DOCUMENT AS DEFERRED
  const handleDefer = (docName) => {
    const updated = { ...selectedChecklist };

    updated.categories = updated.categories.map((d) =>
      d.name === docName ? { ...d, status: "Deferred" } : d
    );

    updated.pendingDocs = updated.categories.filter(
      (d) => d.status !== "Submitted"
    ).length;

    setSelectedChecklist(updated);

    message.warning(`${docName} marked as deferred`);
  };

  // CAN RM SUBMIT?
  const canSubmit =
    selectedChecklist &&
    selectedChecklist.categories.every(
      (d) => d.status === "Submitted" || d.status === "Deferred"
    );

  // TABLE COLUMNS
  const columns = [
    { title: "Loan No", dataIndex: "id", width: 100 },
    { title: "Customer", dataIndex: "customerName", width: 120 },
    { title: "Loan Type", dataIndex: "loanType", width: 120 },
    {
      title: "Progress",
      render: (_, row) => {
        const percent = Math.round(
          ((row.totalDocs - row.pendingDocs) / row.totalDocs) * 100
        );
        return <Progress percent={percent} size="small" />;
      },
    },
    {
      title: "Action",
      width: 140,
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => openRMDashboard(record)}>
          Open Checklist
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search Loan / Customer"
        allowClear
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 250, marginBottom: 12 }}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        size="small"
        pagination={{ pageSize: 6 }}
      />

      {/* ---------------------- RM Drawer ----------------------- */}
      <Drawer
        title={`RM Checklist — ${selectedChecklist?.customerName}`}
        width={420}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedChecklist && (
          <>
            <Text strong>Loan Type:</Text> {selectedChecklist.loanType} <br />
            <Text strong>Status:</Text> {selectedChecklist.status} <br />
            <Text strong>Pending Docs:</Text> {selectedChecklist.pendingDocs} <br />
            <Text strong>Deadline:</Text> {selectedChecklist.deadline} <br />

            <Title level={5} style={{ marginTop: 20 }}>
              Required Documents
            </Title>

            {selectedChecklist.categories.map((doc) => (
              <div
                key={doc.name}
                className="flex justify-between items-center py-2 border-b text-sm"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{doc.name}</span>

                <div style={{ display: "flex", gap: 6 }}>
                  <Tag
                    color={
                      doc.status === "Submitted"
                        ? "green"
                        : doc.status === "Deferred"
                        ? "orange"
                        : "blue"
                    }
                  >
                    {doc.status}
                  </Tag>

                  {/* Upload Button */}
                  <Upload
                    beforeUpload={(file) => handleUpload(file, doc.name)}
                    showUploadList={false}
                    disabled={doc.status === "Submitted"}
                  >
                    <Button size="small" icon={<UploadOutlined />} disabled={doc.status === "Submitted"}>
                      Upload
                    </Button>
                  </Upload>

                  {/* Defer Button */}
                  <Button
                    size="small"
                    danger
                    onClick={() => handleDefer(doc.name)}
                    disabled={doc.status === "Submitted"}
                  >
                    Defer
                  </Button>
                </div>
              </div>
            ))}

            {/* --------------------------------------------------
               RM Submission Section
            -------------------------------------------------- */}
            <Title level={5} style={{ marginTop: 25 }}>
              Submit Checklist
            </Title>

            <Button
              type="primary"
              block
              disabled={!canSubmit}
              onClick={() => message.success("Checklist submitted to Credit Officer!")}
            >
              Submit to Credit Officer
            </Button>

            {!canSubmit && (
              <p style={{ color: "red", marginTop: 10, fontSize: 12 }}>
                ⚠ Please upload all documents or mark them as deferred before submitting.
              </p>
            )}
          </>
        )}
      </Drawer>
    </div>
  );
};

export default BaseChecklistTableRm;
