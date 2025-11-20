import React, { useState } from "react";
import ChecklistTableCO from "./ChecklistTableCO";
import ChecklistActionDrawerCO from "./ChecklistActionDrawerCO";

const COChecklistPage = () => {
  const [selectedChecklistCO, setSelectedChecklistCO] = useState(null);

  return (
    <>
      <ChecklistTableCO onOpenDrawer={(row) => setSelectedChecklistCO(row)} />

      <ChecklistActionDrawerCO
        checklist={selectedChecklistCO}
        onClose={() => setSelectedChecklistCO(null)}
      />
    </>
  );
};

export default COChecklistPage;
