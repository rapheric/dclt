import React from "react";
import BaseChecklistTable from "./BaseChecklistTable";
import { mockChecklists } from "../../data/mockChecklists";

const DeferredChecklists = () => {
  return (
    <BaseChecklistTable
      title="Deferred Checklists"
      data={mockChecklists.filter((c) => c.status === "Deferred")}
    />
  );
};

export default DeferredChecklists;
