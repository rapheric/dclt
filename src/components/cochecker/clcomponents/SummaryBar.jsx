const SummaryBar = ({ summary }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
    {[
      { label: "Total Documents", value: summary.total, color: "bg-gray-200 text-gray-700" },
      { label: "Submitted", value: summary.submitted, color: "bg-green-100 text-green-700" },
      { label: "Pending", value: summary.pending, color: "bg-red-100 text-red-700" },
      { label: "Not Actioned", value: summary.notActioned, color: "bg-gray-100 text-gray-700" },
    ].map((item, i) => (
      <div key={i} className={`${item.color} p-4 rounded-lg shadow text-center border`}>
        <p className="text-sm">{item.label}</p>
        <p className="font-semibold text-lg">{item.value}</p>
      </div>
    ))}
  </div>
);

export default SummaryBar;
