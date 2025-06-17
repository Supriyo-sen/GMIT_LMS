// components/core/Admin/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  BookIcon,
  LayersIcon,
  CreditCardIcon,
  MessageSquareIcon,
  BarChartIcon,
  SettingsIcon,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <HomeIcon /> },
  { name: "Users", path: "/admin/users", icon: <UsersIcon /> },
  { name: "Courses", path: "/admin/courses", icon: <BookIcon /> },
  { name: "Categories", path: "/admin/categories", icon: <LayersIcon /> },
  { name: "Payments", path: "/admin/payments", icon: <CreditCardIcon /> },
  { name: "Reviews", path: "/admin/reviews", icon: <MessageSquareIcon /> },
  { name: "Messages", path: "/admin/messages", icon: <MessageSquareIcon /> },
  { name: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
];

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-richblack-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-richblack-700 ${
                isActive ? "bg-yellow-100 text-black" : "text-richblack-100"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
