import React, { useState } from "react";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Instructor",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
  },
];

const Users = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Users Management</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full md:w-1/3 px-4 py-2 mb-6 rounded border border-gray-600 bg-richblack-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-richblack-700">
          <thead>
            <tr className="bg-richblack-800 text-white">
              <th className="px-4 py-2 border-b border-richblack-700">Name</th>
              <th className="px-4 py-2 border-b border-richblack-700">Email</th>
              <th className="px-4 py-2 border-b border-richblack-700">Role</th>
              <th className="px-4 py-2 border-b border-richblack-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-richblack-700">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      user.status === "Active"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
