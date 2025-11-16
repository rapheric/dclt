import StatusSelect from "./StatusSelect";
import FileUpload from "./FileUpload";

const DocumentRow = ({
  category,
  doc,
  catIdx,
  docIdx,
  onUpdate,
  onFileUpload,
}) => {
  const statusColor =
    doc.status === "Submitted"
      ? "text-green-600"
      : doc.status === "Pending"
      ? "text-red-600"
      : "text-gray-400";

  return (
    <tr className="hover:bg-gray-50 border-b border-black-300 text-gray-700 ">
      {docIdx === 0 && (
        <td
          rowSpan={category.documents.length}
          className="px-4 py-2 border-r border-black-300 font-semibold text-gray-700 bg-gray-50"
        >
          {category.title}
        </td>
      )}

      <td className="px-4 py-2 border-r border-black-300">{doc.name}</td>

      <td className={`px-4 py-2 border-r border-black-300 font-semibold ${statusColor}`}>
        {doc.status || "—"}
      </td>

      <td className="px-4 py-2 border-r border-black-300">
        <StatusSelect
          value={doc.status}
          onChange={(v) => onUpdate(catIdx, docIdx, "status", v)}
        />
      </td>

      <td className="px-4 py-2 border-r border-black-300">
        <input
          className="w-full border rounded-md px-2 py-1"
          placeholder="Add comment..."
          value={doc.comment}
          onChange={(e) => onUpdate(catIdx, docIdx, "comment", e.target.value)}
        />
      </td>

      <td className="px-4 py-2 border-r border-black-300">
        <FileUpload
          id={`file-${catIdx}-${docIdx}`}
          file={doc.file}
          onUpload={(file) => onFileUpload(catIdx, docIdx, file)}
        />
      </td>

      <td className="px-4 py-2">
        {doc.file ? (
          <button
            onClick={() => window.open(URL.createObjectURL(doc.file), "_blank")}
            className="bg-gray-700 hover:bg-gray-900 text-gray-600 text-sm px-3 py-1.5 rounded-md"
          >
            View
          </button>
        ) : (
          <span className="text-gray-400 text-sm">No File</span>
        )}
      </td>
    </tr>
  );
};

export default DocumentRow;
