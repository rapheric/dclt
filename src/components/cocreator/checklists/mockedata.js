export const mockChecklists = [
  {
    _id: "1",
    applicantName: "John Doe",
    loanType: "Mortgage",
    rmId: { _id: "rm1", firstName: "Alice", lastName: "Kamau" },
    createdAt: "2025-02-12T10:22:00Z",
    categories: [
      {
        title: "Mortgage Required Documents",
        documents: [
          { name: "ID Copy", status: "Submitted" },
          { name: "Bank Statements", status: "Pending" },
          { name: "KRA Pin", status: "Submitted" },
          { name: "Payslip", status: "Deferred" },
        ],
      },
    ],
  },
  {
    _id: "2",
    applicantName: "Michael Otieno",
    loanType: "SME Loan",
    rmId: { _id: "rm2", firstName: "Brian", lastName: "Waweru" },
    createdAt: "2025-02-11T14:00:00Z",
    categories: [
      {
        title: "SME Loan Documents",
        documents: [
          { name: "Business License", status: "Pending" },
          { name: "Company KRA", status: "Not Actioned" },
          { name: "Financial Statements", status: "Deferred" },
        ],
      },
    ],
  },
  {
    _id: "3",
    applicantName: "Sarah Njeri",
    loanType: "Mortgage",
    rmId: { _id: "rm1", firstName: "Alice", lastName: "Kamau" },
    createdAt: "2025-02-10T09:30:00Z",
    categories: [
      {
        title: "Documents",
        documents: [
          { name: "Payslip", status: "Submitted" },
          { name: "ID Copy", status: "Submitted" },
        ],
      },
    ],
  },
];
