import React, { useState } from "react";
import ChecklistsTableMM from "./ChecklistTableRM.jsx";
import ChecklistActionDrawerRMM from "./ChecklistActionDrawerRMM.jsx";

const RMChecklistPage = () => {
  const [selectedChecklistRM, setSelectedChecklistRM] = useState(null);

  return (
    <>
      <ChecklistsTableMM onOpenDrawer={(row) => setSelectedChecklistRM(row)} />

      <ChecklistActionDrawerRMM
        checklist={selectedChecklistRM}
        onClose={() => setSelectedChecklistRM(null)}
      />
    </>
  );
};

export default RMChecklistPage;
