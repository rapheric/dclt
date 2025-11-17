import React, { useState } from "react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useToggleActiveMutation,
  useChangeRoleMutation,
} from "../api/userApi";

import UserTable from "../components/admin/UserTable";
import CreateUserModal from "../components/admin/CreateUserModal";

const Dashboard = () => {
  const { data: users = [], refetch } = useGetUsersQuery();

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [toggleActive] = useToggleActiveMutation();
  const [changeRole] = useChangeRoleMutation();

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "rm",
  });

  const handleCreate = async () => {
    await createUser(formData);
    setFormData({ name: "", email: "", password: "", role: "rm" });
    setOpenModal(false);
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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4 sm:p-8 font-sans">
      {/* <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"> */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4 sm:mb-0 tracking-wide">
            🏦 Bank Admin Control Panel
          </h2>

          {/* Create User Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow transition-colors duration-300"
          >
            + Create User
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6">
          Manage all users, roles, and account status in a secure environment.
        </p>

        {/* User Table */}
        <UserTable
          users={users}
          onToggleActive={handleToggleActive}
          onRoleChange={handleChangeRole}
        />

        {/* Modal Form */}
        <CreateUserModal
          visible={openModal}
          loading={isCreating}
          formData={formData}
          setFormData={setFormData}
          onCreate={handleCreate}
          onClose={() => setOpenModal(false)}
        />
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
