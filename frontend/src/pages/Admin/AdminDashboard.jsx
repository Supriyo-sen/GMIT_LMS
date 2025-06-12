import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function AdminDashboard() {
  const reports = [
    {
      title: "Total Enrollments",
      value: 320,
      icon: "🎓",
      description: "Total students enrolled across all courses.",
    },
    {
      title: "Revenue",
      value: "₹ 1,20,000",
      icon: "💰",
      description: "Revenue generated this month.",
    },
    {
      title: "Active Courses",
      value: 18,
      icon: "📘",
      description: "Courses currently live and accepting enrollments.",
    },
    {
      title: "Pending Reviews",
      value: 12,
      icon: "📝",
      description: "Reviews awaiting moderation.",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 20000 },
    { month: "Feb", revenue: 25000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 30000 },
    { month: "May", revenue: 27000 },
  ];

  const courseCategoryData = [
    { name: "Development", value: 8 },
    { name: "Design", value: 5 },
    { name: "Marketing", value: 3 },
    { name: "Business", value: 2 },
  ];

  const COLORS = ["#1e40af", "#3b82f6", "#93c5fd", "#1d4ed8"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Reports</h1>

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

      {/* Revenue Bar Chart */}
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

      {/* Course Category Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Courses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={courseCategoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {courseCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
