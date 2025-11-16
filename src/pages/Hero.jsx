import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import TopToolbar from "../components/cochecker/Layout/TopToolbar";
import SideQueuePanel from "../components/cochecker/Layout/SideQueuePanel";
import LoanTable from "../components/cochecker/Loans/LoanTable";
import LoanModal from "../components/cochecker/Loans/LoanModal";

function Hero() {
  const [loans, setLoans] = useState([
    {
      id: 101,
      registrationNo: "Loan-293614",
      name: "John Doe",
      amount: 50000,
      status: "Pending Review",
      entryDate: "2025-10-09 16:58:23",
      tatRemaining: "09d:06h:26m",
      tatConsumed: "09d:06h:26m",
      workStep: "Docs_Pending",
      firstName: "JOHN",
      surname: "DOE",
    },
    {
      id: 102,
      registrationNo: "Loan-292160",
      name: "Mary Smith",
      amount: 25000,
      status: "Pending Deferral",
      entryDate: "2025-09-26 18:36:08",
      tatRemaining: "13d:00h:25m",
      tatConsumed: "13d:00h:25m",
      workStep: "Pending_Deferral",
      firstName: "MARY",
      surname: "SMITH",
    },
    {
      id: 103,
      registrationNo: "Loan-291032",
      name: "James Brown",
      amount: 40000,
      status: "Submitted",
      entryDate: "2025-10-24 12:06:58",
      tatRemaining: "—",
      tatConsumed: "—",
      workStep: "Submitted",
      firstName: "JAMES",
      surname: "BROWN",
    },
  ]);

  const [openedLoan, setOpenedLoan] = useState(null);
  const [search, setSearch] = useState("");

  const statusOptions = ["Pending Review", "Pending Deferral", "Submitted"];
  const workStepOptions = ["Docs_Pending", "Pending_Deferral", "Submitted"];

  const filteredLoans = loans.filter(
    (loan) =>
      loan.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
      loan.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateLoanStatus = (id, newStatus) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, status: newStatus } : loan
      )
    );
    setOpenedLoan(null);
  };

  const updateWorkStep = (id, newStep) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, workStep: newStep } : loan
      )
    );
    setOpenedLoan(null);
  };

//   const navigate = useNavigate();
//   const openChecklist = () => {
//     navigate("/cl");
//   };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">
      <TopToolbar />

      <div className="flex">
        <SideQueuePanel />

        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-[#0052B1] mb-4">
            My Search Queue
          </h2>

          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded mb-4 w-72"
          />

          <LoanTable loans={filteredLoans} onOpen={setOpenedLoan} />

          {openedLoan && (
            <LoanModal
              loan={openedLoan}
              statusOptions={statusOptions}
              workStepOptions={workStepOptions}
              onStatusUpdate={updateLoanStatus}
              onStepUpdate={updateWorkStep}
              onClose={() => setOpenedLoan(null)}
            />
          )}
        </div>
      </div>
      {/* <div>
        <button onClick={openChecklist}>checklist</button>
      </div> */}
    </div>
  );
}

export default Hero;
