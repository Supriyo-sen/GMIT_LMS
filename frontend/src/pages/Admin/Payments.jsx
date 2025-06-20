import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getPaymentLogs,
  getPaymentOverView,
} from "../../services/operations/studentFeaturesAPI";
import toast from "react-hot-toast";
import { formattedDate } from "../../utils/dateFormatter";

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [paymentOverView, setPaymentOverView] = useState({
    totalIncome: 0,
    successfulPayments: 0,
    failedPayments: 0,
  });
  const [paymentData, setPaymentData] = useState([]);

  async function fetchPaymentOverview(token) {
    try {
      const response = await getPaymentOverView(token);
      // console.log("GET_PAYMENT_OVERVIEW_API RESPONSE............", response);
      setPaymentOverView({
        totalIncome: response.totalIncome,
        successfulPayments: response.successfulPayments,
        failedPayments: response.failedPayments,
      });
    } catch (error) {
      console.error("Error fetching payment overview:", error);
      // Handle error appropriately, e.g., show a toast notification
      toast.error("Failed to fetch payment overview");
    }
  }

  async function fetchPaymentData(token) {
    try {
      const response = await getPaymentLogs(token);
      console.log("GET_PAYMENT_LOGS_API RESPONSE............", response);
      setPaymentData(response);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      toast.error("Failed to fetch payment data");
    }
  }

  useEffect(() => {
    if (token) {
      fetchPaymentOverview(token);
      fetchPaymentData(token);
    }
  }, [token]);
  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-3xl font-semibold mb-8 border-b pb-4">
        💳 Payments Overview
      </h1>

      {/* ========== SUMMARY CARDS ========== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-5 rounded shadow">
          <p className="text-gray-600">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-800">
            ₹{paymentOverView.totalIncome}
          </h2>
        </div>
        <div className="bg-blue-100 p-5 rounded shadow">
          <p className="text-gray-600">Successful Payments</p>
          <h2 className="text-2xl font-bold text-blue-800">
            {paymentOverView.successfulPayments}
          </h2>
        </div>
        <div className="bg-red-100 p-5 rounded shadow">
          <p className="text-gray-600">Failed Transactions</p>
          <h2 className="text-2xl font-bold text-red-800">
            {paymentOverView.failedPayments}
          </h2>
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
      <div className="overflow-x-auto border rounded-xl shadow bg-white">
  <table className="min-w-full table-auto text-sm md:text-sm">
    <thead className="bg-blue-100 text-blue-800">
      <tr>
        <th className="px-4 py-2 text-left border-b border-gray-300">👤 User</th>
        <th className="px-4 py-2 text-left border-b border-gray-300">✉️ Email</th>
        <th className="px-4 py-2 text-left border-b border-gray-300">📚 Course</th>
        <th className="px-4 py-2 text-left border-b border-gray-300">👨‍🏫 Instructor</th>
        <th className="px-4 py-2 text-left border-b border-gray-300">💰 Amount</th>
        <th className="px-4 py-2 text-left border-b border-gray-300">📊 Status</th>
        <th className="px-4 py-2 text-left border-b border-gray-300">📅 Date</th>
      </tr>
    </thead>
    <tbody>
      {paymentData
        .filter((item) =>
          [item.user, item.email, item.course]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .map((item, idx) => (
          <tr
            key={idx}
            className={`transition duration-300 hover:bg-blue-50 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="px-4 py-3 border-b border-gray-200">{item.user}</td>
            <td className="px-4 py-3 border-b border-gray-200">{item.email}</td>
            <td className="px-4 py-3 border-b border-gray-200">{item.course}</td>
            <td className="px-4 py-3 border-b border-gray-200">{item.instructor}</td>
            <td className="px-4 py-3 border-b border-gray-200">₹{item.amount}</td>
            <td className="px-4 py-3 border-b border-gray-200">
              {item.status === "SUCCESS" ? (
                <span className="text-green-600 font-semibold">Success</span>
              ) : (
                <span className="text-red-500 font-semibold">Failed</span>
              )}
            </td>
            <td className="px-6 py-3 border-b border-gray-200">{formattedDate(item.date)}</td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
