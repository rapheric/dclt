// src/components/checklists/DeferredChecklists.jsx
import React from "react";
import { mockChecklists } from "./mockedata";
import { Tag } from "antd";

const DeferredChecklists = () => {
  const deferred = mockChecklists.filter((cl) =>
    cl.categories[0].documents.some((doc) => doc.status === "Deferred")
  );

  return (
    <div className="p-6 bg-white rounded shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Deferred Checklists</h2>

      {deferred.length === 0 && <p>No deferred checklists</p>}

      {deferred.map((item) => (
        <div key={item._id} className="border p-4 mb-3 rounded bg-yellow-50">
          <h3 className="font-semibold">{item.applicantName}</h3>
          <p className="text-sm text-gray-600">
            RM: {item.rmId.firstName} {item.rmId.lastName}
          </p>
          <Tag color="gold">Deferred</Tag>
        </div>
      ))}
    </div>
  );
};

export default DeferredChecklists;
