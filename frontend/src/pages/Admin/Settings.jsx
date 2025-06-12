import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Settings</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="mt-10 border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notification Preferences</h2>
        <form className="space-y-4">
          <div className="flex items-center gap-4">
            <input type="checkbox" id="emailNotifications" className="w-5 h-5 text-blue-600" />
            <label htmlFor="emailNotifications" className="text-gray-600">
              Receive email notifications
            </label>
          </div>
          <div className="flex items-center gap-4">
            <input type="checkbox" id="smsNotifications" className="w-5 h-5 text-blue-600" />
            <label htmlFor="smsNotifications" className="text-gray-600">
              Receive SMS alerts
            </label>
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-900"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
