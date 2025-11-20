import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { name: 'Jan', Sales: 4000 },
  { name: 'Feb', Sales: 3000 },
  { name: 'Mar', Sales: 5000 },
  { name: 'Apr', Sales: 4000 },
  { name: 'May', Sales: 6000 },
];

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'In Progress', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const CombinedCharts = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
      {/* Bar Chart */}
      <div style={{ flex: 1, minWidth: 300, height: 400, background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0px 2px 6px rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center" }}>Monthly Sales</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div style={{ flex: 1, minWidth: 300, height: 400, background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0px 2px 6px rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center" }}>Task Status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CombinedCharts;
