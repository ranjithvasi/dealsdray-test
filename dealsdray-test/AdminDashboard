import React from "react";
import { useAuth } from "../context/AuthContext";
import PageTitleNavbar from "./PageTitleNavbar"; // Import the first navbar
import MainNavbar from "./MainNavbar"; // Import the second navbar

const AdminDashboard = () => {
  const { user } = useAuth(); // Get the logged-in user

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNavbar /> {/* Show the main navigation */}
      <PageTitleNavbar pageTitle="Admin Dashboard" /> {/* Display page name */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Welcome to the Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Employees */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Employees</h2>
            <p className="text-4xl font-bold text-blue-600">123</p>
          </div>

          {/* Total Departments */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Departments</h2>
            <p className="text-4xl font-bold text-green-600">5</p>
          </div>

          {/* Projects */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Active Projects</h2>
            <p className="text-4xl font-bold text-purple-600">8</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Manage Employees</h3>
            <p className="mb-4">View and edit employee details</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">
              Go to Employee List
            </button>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Create New Project</h3>
            <p className="mb-4">Start a new project and assign tasks</p>
            <button className="bg-green-600 text-white py-2 px-4 rounded">
              Create Project
            </button>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">View Reports</h3>
            <p className="mb-4">Generate and view company reports</p>
            <button className="bg-purple-600 text-white py-2 px-4 rounded">
              View Reports
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white mt-8 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="divide-y divide-gray-300">
            <li className="py-4">
              <p className="text-sm text-gray-600">
                John Doe updated project "New Website Launch"
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </li>
            <li className="py-4">
              <p className="text-sm text-gray-600">
                Jane Smith added a new employee
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </li>
            <li className="py-4">
              <p className="text-sm text-gray-600">
                Mark Lee created a new department
              </p>
              <span className="text-xs text-gray-400">3 days ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
