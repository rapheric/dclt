import React from "react";
import BaseChecklistTable from "./BaseChecklistTable";
import { mockChecklists } from "../../data/mockChecklists";

const CompletedChecklists = () => {
  return (
    <BaseChecklistTable
      title="Completed Checklists"
      data={mockChecklists.filter((c) => c.status === "Completed")}
    />
  );
};

export default CompletedChecklists;
