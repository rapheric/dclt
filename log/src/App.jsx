import { useState } from "react";

function App() {
  const [form, setForm] = useState({ username: "", password: "" });

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2 mt-5"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        className="border p-2 mt-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={login}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default App;
