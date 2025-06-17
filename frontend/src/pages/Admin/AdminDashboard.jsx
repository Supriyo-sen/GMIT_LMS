import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import CustomTooltip from "../../components/common/CustomTooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseAnalytics,
  getDashboardAnalytics,
  getInstructorEarnings
} from "../../services/operations/analytics";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [courseCategoryData, setCourseCategoryData] = useState([]);
  const [instructorEarnings, setInstructorEarnings] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const fetchDashboardAnalytics = async () => {
    try {
      const response = await getDashboardAnalytics(token, dispatch);
      console.log("GET_DASHBOARD_ANALYTICS_API RESPONSE............", response);
      setReports(response?.data || []);
      setRevenueData(response?.trendData || []);
    } catch (error) {
      console.error("GET_DASHBOARD_ANALYTICS_API ERROR............", error);
    }
  };

  const fetchCourseAnalytics = async () => {
    try {
      const response = await getCourseAnalytics(null, token, dispatch);
      console.log("GET_COURSE_ANALYTICS_API RESPONSE............", response);
      setCourseCategoryData(response || []);
    } catch (error) {
      console.error("GET_COURSE_ANALYTICS_API ERROR............", error);
    }
  };

  const fetchInstructorEarnings = async () => {
    try {
      const response = await getInstructorEarnings(token, dispatch);
      console.log("GET_INSTRUCTOR_EARNINGS_API RESPONSE............", response);
      setInstructorEarnings(response || []);
    } catch (error) {
      console.error("GET_INSTRUCTOR_EARNINGS_API ERROR............", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardAnalytics();
      fetchCourseAnalytics();
      fetchInstructorEarnings();
    }
  }, [token]);

  console.log("REVENUE_DATA............", revenueData);
  

  const COLORS = ["#1e40af", "#3b82f6", "#93c5fd", "#1d4ed8", "#60a5fa", "#2563eb"];
  const EARNINGS_COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Reports</h1>

      {/* === REPORT CARDS === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {reports.map((report, idx) => (
          <div
            key={idx}
            className="bg-gray-50 shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{report.icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">{report.title}</h2>
                <p className="text-2xl font-bold text-blue-600">{report.value}</p>
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-500">{report.description}</p>
          </div>
        ))}
      </div>

      {/* === BAR CHART === */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* === COURSE CATEGORIES PIE CHART === */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Courses by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseCategoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {courseCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* === INSTRUCTOR EARNINGS PIE CHART === */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Instructor Earnings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={instructorEarnings}
                dataKey="totalIncome"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {instructorEarnings.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={EARNINGS_COLORS[index % EARNINGS_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p>Earnings: ₹{data.totalIncome?.toLocaleString('en-IN') || 0}</p>
                        <p>Sales: {data.totalSales || 0}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
