import StatusSelect from "./StatusSelect";
import FileUpload from "./FileUpload";
import { getFilePreview } from "../utils/filePreview";

const DocumentCard = ({ doc, catIdx, docIdx, onUpdate, onFileUpload }) => {
  const statusColor =
    doc.status === "Submitted"
      ? "text-green-600"
      : doc.status === "Pending"
      ? "text-red-600"
      : "text-gray-400";

  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <p className="font-medium mb-1">{doc.name}</p>

      <p className={`font-semibold mb-2 ${statusColor}`}>
        Status: {doc.status || "—"}
      </p>

      <StatusSelect
        value={doc.status}
        onChange={(v) => onUpdate(catIdx, docIdx, "status", v)}
      />

      <input
        className="border w-full rounded-md mt-2 px-2 py-1"
        placeholder="Comment..."
        value={doc.comment}
        onChange={(e) => onUpdate(catIdx, docIdx, "comment", e.target.value)}
      />

      <FileUpload
        id={`mobile-file-${catIdx}-${docIdx}`}
        file={doc.file}
        onUpload={(file) => onFileUpload(catIdx, docIdx, file)}
      />

      {doc.file && (
        <div className="flex items-center gap-2 mt-2">
          <img src={getFilePreview(doc.file)} className="w-4 h-4" />
          <button
            onClick={() => window.open(URL.createObjectURL(doc.file), "_blank")}
            className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md"
          >
            View File
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
