import React from "react";
import {
  Drawer,
  Table,
  Select,
  Upload,
  Input,
  Button,
  message,
  Checkbox,
  Typography,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUpdateChecklistStatusMutation } from "../../../api/checklistApi";

const { Text } = Typography;

const ChecklistActionDrawerRM = ({ checklist, onClose }) => {
  const [updateChecklist] = useUpdateChecklistStatusMutation();
  if (!checklist) return null;

  const updateDoc = async (index, field, value) => {
    const updated = [...checklist.documents];
    updated[index][field] = value;

    try {
      await updateChecklist({ id: checklist.id, documents: updated }).unwrap();
      message.success("Document updated");
    } catch (err) {
      message.error("Failed to update document");
    }
  };

  const submit = async () => {
    try {
      await updateChecklist({
        id: checklist.id,
        status: "RM Submitted",
      }).unwrap();
      message.success("Checklist submitted to CO");
      onClose();
    } catch (err) {
      message.error("Submission failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "#52c41a";
      case "Deferred":
        return "#f5222d";
      default:
        return "#faad14";
    }
  };

  const columns = [
    {
      title: "",
      width: 50,
      render: (_, doc, i) => {
        const color = getStatusColor(doc.status);

        return (
          <Checkbox
            checked={doc.checked || false}
            onChange={(e) => updateDoc(i, "checked", e.target.checked)}
            className="status-checkbox"
            data-color={color}
          />
        );
      },
    },
    {
      title: "Document",
      dataIndex: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Status",
      render: (_, doc, i) => (
        <Select
          value={doc.status || "Pending"}
          style={{
            width: 140,
            fontWeight: 600,
            color: getStatusColor(doc.status),
          }}
          onChange={(v) => updateDoc(i, "status", v)}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Submitted">Submitted</Select.Option>
          <Select.Option value="Deferred">Deferred</Select.Option>
        </Select>
      ),
    },
    {
      title: "Upload",
      render: (_, doc) => (
        <Upload
          beforeUpload={() => false}
          showUploadList={false}
          onChange={(info) => message.success(`${info.file.name} selected`)}
        >
          <Button
            icon={<UploadOutlined />}
            size="small"
            style={{ backgroundColor: "#e6f7ff", borderColor: "#91d5ff" }}
          >
            Upload
          </Button>
        </Upload>
      ),
    },
    {
      title: "Comment",
      render: (_, doc, i) => (
        <Input
          placeholder="Add comment"
          value={doc.comment || ""}
          onChange={(e) => updateDoc(i, "comment", e.target.value)}
          style={{ borderRadius: 4 }}
        />
      ),
    },
  ];

  return (
    <Drawer
      open={!!checklist}
      onClose={onClose}
      width={900}
      title="RM Checklist Actions"
      placement="right"
      bodyStyle={{ padding: "30px 40px", background: "#f9f9fb" }}
      headerStyle={{
        borderBottom: "2px solid #e0e0e0",
        background: "#ffffff",
        fontSize: 18,
        fontWeight: 600,
      }}
    >
      <Divider orientation="left" style={{ fontWeight: 600, color: "#1890ff" }}>
        Documents
      </Divider>

      <Table
        pagination={false}
        dataSource={checklist.documents.map((d, i) => ({ ...d, key: i }))}
        columns={columns}
        bordered
        style={{ marginTop: 16 }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bank-table-row-light" : "bank-table-row-dark"
        }
      />

      <Button
        type="primary"
        block
        size="large"
        style={{
          marginTop: 24,
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          fontWeight: 600,
          borderRadius: 6,
        }}
        onClick={submit}
      >
        Submit to CO
      </Button>

      <style jsx>{`
        .bank-table-row-light {
          background: #ffffff;
        }
        .bank-table-row-dark {
          background: #f5f5f7;
        }
        .ant-table-thead > tr > th {
          background: #f0f5ff;
          font-weight: 600;
          color: #001529;
        }
        .ant-table-tbody > tr:hover > td {
          background: #e6f7ff;
        }

        /* Color coded checkboxes */
        .status-checkbox .ant-checkbox-inner {
          border-color: var(--color);
        }
        .status-checkbox[data-color="#52c41a"] .ant-checkbox-inner {
          border-color: #52c41a;
        }
        .status-checkbox[data-color="#faad14"] .ant-checkbox-inner {
          border-color: #faad14;
        }
        .status-checkbox[data-color="#f5222d"] .ant-checkbox-inner {
          border-color: #f5222d;
        }
      `}</style>
    </Drawer>
  );
};

export default ChecklistActionDrawerRM;
