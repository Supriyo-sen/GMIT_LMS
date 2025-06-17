// ✅ Updated Users.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfiles } from "../../services/operations/profileAPI";
import { approveInstructor } from "../../services/operations/authAPI";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const response = await getUserProfiles(token);
      console.log("GET_ALL_USER_PROFILES_API API RESPONSE............", response);
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      console.error("Could not fetch users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleApprove = async (instructorId) => {
    await dispatch(approveInstructor(instructorId, token)); // Fixed token
    getUsers();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
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
              <th className="px-4 py-2 border-b border-richblack-700">Approval</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-richblack-700">
                <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.accountType}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      user.active ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.accountType === "Instructor" ? (
                    user.approved ? (
                      <button
                        disabled
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded cursor-not-allowed"
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-600"
                      >
                        Approve
                      </button>
                    )
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
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
