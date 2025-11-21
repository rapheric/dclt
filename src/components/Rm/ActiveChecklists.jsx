import React from "react";
import BaseChecklistTable from "./BaseChecklistTable";
import { mockChecklists } from "../../data/mockChecklists";

const ActiveChecklists = () => {
  return (
    <BaseChecklistTable
      title="Active Checklists"
      data={mockChecklists.filter((c) => c.status === "Active")}
    />
  );
};

export default ActiveChecklists;
