import React, { useState } from "react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useToggleActiveMutation,
  useChangeRoleMutation,
} from "../api/userApi";

const Dashboard = () => {
  const { data: users = [], refetch } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [toggleActive] = useToggleActiveMutation();
  const [changeRole] = useChangeRoleMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "rm",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createUser(form);
    setForm({ name: "", email: "", password: "", role: "rm" });
    refetch();
  };

  const handleToggleActive = async (id) => {
    await toggleActive(id);
    refetch();
  };

  const handleChangeRole = async (id, role) => {
    await changeRole({ id, role });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">
          👑 Admin Dashboard
        </h2>

        {/* Create User Form */}
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border text-gray-600 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border text-gray-600 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border text-gray-600 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border text-gray-600 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="user">Relationship manager</option>
            <option value="cocreator">CO creator</option>
            <option value="cochecker">CO checker</option>
             <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={isCreating}
            className={`${
              isCreating ? "bg-gray-200" : "bg-gray-300 hover:bg-gray-600"
            } text-gray-600 font-semibold rounded-lg transition px-4 py-2`}
          >
            {isCreating ? "Creating..." : "Create User"}
          </button>
        </form>

        {/* User List */}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">User List</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-400 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-600 ">{u.name}</td>
                    <td className="py-3 px-4 text-gray-600">{u.email}</td>
                    <td className="py-3 px-4 text-gray-600 capitalize">
                      {u.role}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        u.active ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {u.active ? "Active" : "Inactive"}
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        onClick={() => handleToggleActive(u._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        {u.active ? "Deactivate" : "Activate"}
                      </button>
                      {/* <button
                        onClick={() =>
                          handleChangeRole(
                            u._id,
                            u.role === "rm" ? "cocreator" : "admin"
                          )
                        }
                        className="bg-gray-400 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        {u.role === "admin" ? "Make User" : "Make Admin"}
                      </button> */}

                      <button
                        onClick={() =>
                          handleChangeRole(
                            u._id,
                            u.role === "rm"
                              ? "cocreator"
                              : u.role === "cocreator"
                              ? "cochecker"
                              : u.role === "cochecker"
                              ? "admin"
                              : "rm"
                          )
                        }
                        className="bg-gray-400 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        {u.role === "rm"
                          ? "Make Cocreator"
                          : u.role === "cocreator"
                          ? "Make Cochecker"
                          : u.role === "cochecker"
                          ? "Make Admin"
                          : "Make RM"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
