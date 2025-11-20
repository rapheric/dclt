import React, { useState } from "react";

const RequestChecklist = () => {
  const documentCategories = [
    {
      title: "Contracts Documents Required",
      documents: [
        "Duly executed facility offer letter",
        "Board resolution of the borrower",
        "Acknowledgment by guarantor form",
        "Total cost of credit",
      ],
    },
    {
      title: "KYC Documents",
      documents: [
        "Certificate of incorporation",
        "Memorandum and articles of association",
        "Company PIN certificate",
        "CR12",
        "ID / Passport",
        "PIN certificate of the borrowers",
      ],
    },
    {
      title: "Facility Documents",
      documents: [
        "Directors personal guarantees and indemnities",
        "Borrowers to open mpesa till number linked to NCBA account",
      ],
    },
    {
      title: "Compliance Documents",
      documents: [
        "Business loan protector cover",
        "Business permits",
        "Borrowers to provide a current/valid tax compliance certificate",
      ],
    },
  ];

  const [checklist, setChecklist] = useState(
    documentCategories.map((category) => ({
      title: category.title,
      documents: category.documents.map((doc) => ({
        name: doc,
        status: "Pending",
        file: null,
        requestDeferral: false,
      })),
    }))
  );

  const handleFileUpload = (catIdx, docIdx, file) => {
    const updated = [...checklist];
    updated[catIdx].documents[docIdx].file = file;

    if (file) {
      updated[catIdx].documents[docIdx].status = "Submitted";
    }

    setChecklist(updated);
  };

  const toggleDeferral = (catIdx, docIdx) => {
    const updated = [...checklist];
    const doc = updated[catIdx].documents[docIdx];

    doc.requestDeferral = !doc.requestDeferral;
    doc.status = doc.requestDeferral ? "Deferred" : "Pending";

    setChecklist(updated);
  };

  // Summary calculations
  const allDocs = checklist.flatMap((c) => c.documents);
  const totalDocuments = allDocs.length;
  const pendingDocuments = allDocs.filter((d) => d.status === "Pending").length;
  const submittedDocuments = allDocs.filter((d) => d.status === "Submitted").length;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">NCBA LOAN CHECKLIST</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/327/327148.png"
            className="w-10 h-10"
            alt="total documents"
          />
          <div>
            <p className="text-gray-600 text-sm">Total Documents</p>
            <p className="text-xl font-bold">{totalDocuments}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
            className="w-10 h-10"
            alt="pending documents"
          />
          <div>
            <p className="text-gray-600 text-sm">Pending Documents</p>
            <p className="text-xl font-bold">{pendingDocuments}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 border">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
            className="w-10 h-10"
            alt="submitted documents"
          />
          <div>
            <p className="text-gray-600 text-sm">Submitted Documents</p>
            <p className="text-xl font-bold">{submittedDocuments}</p>
          </div>
        </div>
      </div>

      {/* Checklist Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left border-r">Category</th>
              <th className="px-4 py-2 text-left border-r">Document</th>
              <th className="px-4 py-2 text-left border-r">Status</th>
              <th className="px-4 py-2 text-left border-r">Upload</th>
              <th className="px-4 py-2 text-left">Request Deferral</th>
            </tr>
          </thead>

          <tbody>
            {checklist.map((category, catIdx) =>
              category.documents.map((doc, docIdx) => (
                <tr key={docIdx} className="hover:bg-gray-50 border-b">
                  {docIdx === 0 && (
                    <td
                      rowSpan={category.documents.length}
                      className="px-4 py-2 border-r font-semibold text-gray-700 bg-gray-50"
                    >
                      {category.title}
                    </td>
                  )}

                  <td className="px-4 py-2 border-r">{doc.name}</td>

                  <td
                    className={`px-4 py-2 border-r font-semibold ${
                      doc.status === "Submitted"
                        ? "text-green-600"
                        : doc.status === "Deferred"
                        ? "text-yellow-600"
                        : "text-black-400"
                    }`}
                  >
                    {doc.status}
                  </td>

                  <td className="px-4 py-2 border-r">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileUpload(
                          catIdx,
                          docIdx,
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                  </td>

                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        alert("Request deferral updated");
                        toggleDeferral(catIdx, docIdx);
                      }}
                      className={`px-3 py-1 rounded-md text-black ${
                        doc.requestDeferral ? "bg-yellow-300" : "bg-gray-200"
                      }`}
                    >
                      {doc.requestDeferral ? "Deferred" : "Request Deferral"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestChecklist;
