

// import React, { useState } from "react";
// import DocumentRow from "../components/cochecker/clcomponents/DocumentRow";
// import DocumentCard from "../components/cochecker/clcomponents/DocumentCard";
// import SummaryBar from "../components/cochecker/clcomponents/SummaryBar";

// // Import the data
// import { documentCategories } from "../data/documentCategories";

// const CreditChecklist = () => {
//   const [checklist, setChecklist] = useState(
//     documentCategories.map((cat) => ({
//       title: cat.title,
//       documents: cat.documents.map((d) => ({
//         name: d,
//         status: "",
//         comment: "",
//         file: null,
//       })),
//     }))
//   );

//   const updateDocument = (catIdx, docIdx, field, value) => {
//     setChecklist((prev) => {
//       const updated = [...prev];
//       updated[catIdx].documents[docIdx][field] = value;
//       return updated;
//     });
//   };

//   const handleFileUpload = (catIdx, docIdx, file) =>
//     updateDocument(catIdx, docIdx, "file", file);

//   const summary = checklist.reduce(
//     (acc, category) => {
//       category.documents.forEach((doc) => {
//         acc.total++;
//         if (doc.status === "Submitted") acc.submitted++;
//         else if (doc.status === "Pending") acc.pending++;
//         else acc.notActioned++;
//       });
//       return acc;
//     },
//     { total: 0, submitted: 0, pending: 0, notActioned: 0 }
//   );

//   return (
//     <div className="p-4 sm:p-8 bg-gray-50 min-h-screen w-screen h-screen" > 
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         NCBA LOAN CHECKLIST
//       </h1>

//       <SummaryBar summary={summary} />

//       {/* Desktop table */}
//       <div className="overflow-x-auto hidden sm:block">
//         <table className="min-w-full border bg-white rounded-lg shadow-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th>Category</th>
//               <th>Document</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>Comment</th>
//               <th>Upload</th>
//               <th>View</th>
//             </tr>
//           </thead>

//           <tbody>
//             {checklist.map((category, catIdx) =>
//               category.documents.map((doc, docIdx) => (
//                 <DocumentRow
//                   key={docIdx}
//                   category={category}
//                   doc={doc}
//                   catIdx={catIdx}
//                   docIdx={docIdx}
//                   onUpdate={updateDocument}
//                   onFileUpload={handleFileUpload}
//                 />
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile */}
//       <div className="sm:hidden space-y-6 mt-6">
//         {checklist.map((category, catIdx) => (
//           <div key={catIdx}>
//             <h2 className="text-lg font-semibold">{category.title}</h2>
//             {category.documents.map((doc, docIdx) => (
//               <DocumentCard
//                 key={docIdx}
//                 doc={doc}
//                 catIdx={catIdx}
//                 docIdx={docIdx}
//                 onUpdate={updateDocument}
//                 onFileUpload={handleFileUpload}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreditChecklist;
import React, { useState } from "react";
import { Table, Upload, Card, Button, Select, Typography, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import DocumentCard from "../components/cochecker/clcomponents/DocumentCard";
import SummaryBar from "../components/cochecker/clcomponents/SummaryBar";
import { documentCategories } from "../data/documentCategories";

const { Option } = Select;
const { Title } = Typography;

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

  // Prepare table data for AntD
  const tableData = [];
  checklist.forEach((cat, catIdx) => {
    cat.documents.forEach((doc, docIdx) => {
      tableData.push({
        key: `${catIdx}-${docIdx}`,
        category: cat.title,
        docName: doc.name,
        status: doc.status || "—",
        action: (
          <Select
            value={doc.status}
            onChange={(value) => updateDocument(catIdx, docIdx, "status", value)}
            style={{ width: "100%" }}
            size="small"
          >
            <Option value="">Select</Option>
            <Option value="Submitted">Submitted</Option>
            <Option value="Pending">Pending</Option>
          </Select>
        ),
        comment: (
          <input
            type="text"
            value={doc.comment}
            placeholder="Add comment..."
            className="border rounded px-2 py-1 w-full text-sm dark:bg-gray-800 dark:text-gray-100"
            onChange={(e) => updateDocument(catIdx, docIdx, "comment", e.target.value)}
          />
        ),
        upload: (
          <Upload
            beforeUpload={(file) => {
              handleFileUpload(catIdx, docIdx, file);
              return false; // prevent automatic upload
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} size="small">
              {doc.file ? "Change File" : "Upload"}
            </Button>
          </Upload>
        ),
        view: doc.file ? (
          <Button
            size="small"
            type="default"
            onClick={() => window.open(URL.createObjectURL(doc.file), "_blank")}
          >
            View
          </Button>
        ) : (
          <span className="text-gray-400 dark:text-gray-300 text-sm">No File</span>
        ),
      });
    });
  });

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record, ) => {
        // Only show category for first document in that category
        const catIdx = record.key.split("-")[0];
        return checklist[catIdx].documents[0].name === record.docName ? text : "";
      },
    },
    { title: "Document", dataIndex: "docName", key: "docName" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Action", dataIndex: "action", key: "action" },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    { title: "Upload", dataIndex: "upload", key: "upload" },
    { title: "View", dataIndex: "view", key: "view" },
  ];

  return (
    <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen w-full">
      <Title level={2} className="text-gray-600 dark:text-gray-100 mb-6">
        NCBA LOAN CHECKLIST
      </Title>

      <SummaryBar summary={summary} />

      {/* Desktop table */}
      <div className="overflow-x-auto hidden sm:block">
        <Table
          dataSource={tableData}
          columns={columns}
          bordered
          rowClassName="dark:bg-gray-800 dark:text-gray-100"
           pagination={{ pageSize: 6 }} 
        />
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-6 mt-6">
        {checklist.map((category, catIdx) => (
          <Card
            key={catIdx}
            title={category.title}
            bordered
            className="dark:bg-gray-800 dark:text-gray-100 shadow-sm"
          >
            <Space direction="vertical" size="small" className="w-full">
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
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreditChecklist;
