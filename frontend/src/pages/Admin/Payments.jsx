import { useState } from "react";

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-3xl font-semibold mb-8 border-b pb-4">💳 Payments Overview</h1>

      {/* ========== SUMMARY CARDS ========== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-5 rounded shadow">
          <p className="text-gray-600">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-800">₹2,45,000</h2>
        </div>
        <div className="bg-blue-100 p-5 rounded shadow">
          <p className="text-gray-600">Successful Payments</p>
          <h2 className="text-2xl font-bold text-blue-800">356</h2>
        </div>
        <div className="bg-red-100 p-5 rounded shadow">
          <p className="text-gray-600">Failed Transactions</p>
          <h2 className="text-2xl font-bold text-red-800">8</h2>
        </div>
      </div>

      {/* ========== FILTERS ========== */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Payments</h2>
        <input
          type="text"
          placeholder="Search by user, email, course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-72 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* ========== PAYMENTS TABLE ========== */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm ">
          <thead className="bg-richblack-800 text-white">
            <tr>
              <th className="text-left px-4 py-3 font-medium">User</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Course</th>
              <th className="text-left px-4 py-3 font-medium">Amount</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-richblack-800 text-white">
            {[...Array(6)].map((_, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3">John Doe</td>
                <td className="px-4 py-3">john@example.com</td>
                <td className="px-4 py-3">React for Beginners</td>
                <td className="px-4 py-3">₹999</td>
                <td className="px-4 py-3">
                  <span className="text-green-600 font-medium">Success</span>
                </td>
                <td className="px-4 py-3">12 June 2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
