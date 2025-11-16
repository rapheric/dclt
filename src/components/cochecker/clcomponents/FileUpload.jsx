import { getFilePreview } from "../utils/filePreview";

const FileUpload = ({ id, file, onUpload }) => (
  <div className="flex items-center gap-2">
    <label
      htmlFor={id}
      className="cursor-pointer bg-white hover:bg-gray-200 text-black text-sm px-3 py-1.5 rounded-md shadow-sm"
    >
      {file ? "Change File" : "Upload"}
    </label>

    <input
      id={id}
      type="file"
      className="hidden"
      onChange={(e) => onUpload(e.target.files[0])}
    />

    {file && <img src={getFilePreview(file)} className="w-4 h-4" alt="file-icon" />}
  </div>
);

export default FileUpload;
