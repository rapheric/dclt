const StatusSelect = ({ value, onChange }) => (
  <select
    className="border border-black-300 rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">Select</option>
    <option value="Submitted">Submitted</option>
    <option value="Pending">Pending</option>
  </select>
);

export default StatusSelect;
