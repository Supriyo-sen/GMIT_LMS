// components/core/Admin/AdminLayout.jsx
import AdminSidebar from "./Sidebar"
import Topbar from "./Topbar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 bg-white min-h-[calc(100vh-4rem)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
