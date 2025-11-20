// src/components/checklists/ActiveChecklists.jsx

import ChecklistsTable from "./ChecklistsTable";
import { mockChecklists } from "./mockedata";

const ActiveChecklists = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Active Loan Checklists
      </h2>

      <ChecklistsTable data={mockChecklists} />
    </div>
  );
};

export default ActiveChecklists;
