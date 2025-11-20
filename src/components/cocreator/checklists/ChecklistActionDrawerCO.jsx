import React from "react";
import { Drawer, Tag, Divider } from "antd";

const ChecklistActionDrawerCO = ({ checklist, onClose }) => {
  if (!checklist) return null;

  return (
    <Drawer
      open={!!checklist}
      onClose={onClose}
      title="CO Checklist Review"
      placement="right"
      width={700}
    >
      <Divider>Documents</Divider>

      {checklist.documents?.map((d) => (
        <div
          key={d.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 0",
            borderBottom: "1px solid #eee",
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
    </Drawer>
  );
};

export default ChecklistActionDrawerCO;
