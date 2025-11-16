

import React, { useState } from "react";
import DocumentRow from "../components/cochecker/clcomponents/DocumentRow";
import DocumentCard from "../components/cochecker/clcomponents/DocumentCard";
import SummaryBar from "../components/cochecker/clcomponents/SummaryBar";

// Import the data
import { documentCategories } from "../data/documentCategories";

const CreditChecklist = () => {
  const [checklist, setChecklist] = useState(
    documentCategories.map((cat) => ({
      title: cat.title,
      documents: cat.documents.map((d) => ({
        name: d,
        status: "",
        comment: "",
        file: null,
      })),
    }))
  );

  const updateDocument = (catIdx, docIdx, field, value) => {
    setChecklist((prev) => {
      const updated = [...prev];
      updated[catIdx].documents[docIdx][field] = value;
      return updated;
    });
  };

  const handleFileUpload = (catIdx, docIdx, file) =>
    updateDocument(catIdx, docIdx, "file", file);

  const summary = checklist.reduce(
    (acc, category) => {
      category.documents.forEach((doc) => {
        acc.total++;
        if (doc.status === "Submitted") acc.submitted++;
        else if (doc.status === "Pending") acc.pending++;
        else acc.notActioned++;
      });
      return acc;
    },
    { total: 0, submitted: 0, pending: 0, notActioned: 0 }
  );

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen w-screen h-screen" > 
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        NCBA LOAN CHECKLIST
      </h1>

      <SummaryBar summary={summary} />

      {/* Desktop table */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full border bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Category</th>
              <th>Document</th>
              <th>Status</th>
              <th>Action</th>
              <th>Comment</th>
              <th>Upload</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {checklist.map((category, catIdx) =>
              category.documents.map((doc, docIdx) => (
                <DocumentRow
                  key={docIdx}
                  category={category}
                  doc={doc}
                  catIdx={catIdx}
                  docIdx={docIdx}
                  onUpdate={updateDocument}
                  onFileUpload={handleFileUpload}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-6 mt-6">
        {checklist.map((category, catIdx) => (
          <div key={catIdx}>
            <h2 className="text-lg font-semibold">{category.title}</h2>
            {category.documents.map((doc, docIdx) => (
              <DocumentCard
                key={docIdx}
                doc={doc}
                catIdx={catIdx}
                docIdx={docIdx}
                onUpdate={updateDocument}
                onFileUpload={handleFileUpload}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditChecklist;
