import React, { useState, useEffect } from "react";

const ChecklistDrawerCO = ({ onChecklistCreated }) => {
  const [visible, setVisible] = useState(false);
  const [loanType, setLoanType] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [rmId, setRmId] = useState("");
  const [rms, setRms] = useState([]);

  // Fetch all active RMs
  useEffect(() => {
    const fetchRMs = async () => {
      try {
        const res = await fetch("/api/users/rms");
        const data = await res.json();
        setRms(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRMs();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/checklists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanType, applicantName, rmId }),
      });

      const data = await res.json();
      if (res.ok) {
        onChecklistCreated(data); // Notify parent
        setVisible(false);
        setLoanType("");
        setApplicantName("");
        setRmId("");
      } else {
        alert(data.message || "Failed to create checklist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>New Checklist</button>

      {visible && (
        <div style={{ padding: 20, background: "#fff", border: "1px solid #ccc" }}>
          <input
            placeholder="Customer Name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
          />
          <select value={rmId} onChange={(e) => setRmId(e.target.value)}>
            <option value="">Select RM</option>
            {rms.map((rm) => (
              <option key={rm._id} value={rm._id}>
                {rm.name}
              </option>
            ))}
          </select>
          <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            <option value="">Select Loan Type</option>
            <option value="mortgage">Mortgage</option>
            <option value="Sme loan">SME Loan</option>
          </select>

          <button onClick={handleCreate}>Create</button>
          <button onClick={() => setVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ChecklistDrawerCO;
