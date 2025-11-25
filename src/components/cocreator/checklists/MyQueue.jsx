import React, { useState, useEffect } from "react";

const MyQueue = () => {
  const [checklists, setChecklists] = useState([]);

  const fetchChecklists = async () => {
    try {
      const res = await fetch("/api/checklists"); // fetch all checklists
      const data = await res.json();
      setChecklists(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChecklists();
    const interval = setInterval(fetchChecklists, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>My Queue</h2>
      {checklists.length === 0 ? (
        <p>No checklists available</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Loan Type</th>
              <th>RM</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {checklists.map((cl) => (
              <tr key={cl._id}>
                <td>{cl.applicantName}</td>
                <td>{cl.loanType}</td>
                <td>{cl.rmId?.name || cl.rmId}</td>
                <td>{cl.completed ? "Completed" : cl.deferred ? "Deferred" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyQueue;
