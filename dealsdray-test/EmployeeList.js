import React from "react";
import PageTitleNavbar from "./PageTitleNavbar";
import MainNavbar from "./MainNavbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
    }
  };

  // Function to display courses
  const renderCourses = (courses) => {
    // Check if courses is defined and is an object
    if (!courses || typeof courses !== "object") {
      return "None"; // Return "None" if courses is undefined or not an object
    }

    const selectedCourses = Object.entries(courses)
      .filter(([_, value]) => value) // Keep only the courses that are true
      .map(([key]) => key) // Extract the course names
      .join(", "); // Join them into a string

    return selectedCourses || "None"; // Return "None" if no courses selected
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNavbar />
      <PageTitleNavbar pageTitle="Employee List" />
      <nav className="bg-white text-white p-2 flex justify-between items-end">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-1 rounded text-black font-semibold px-3 py-1 rounded shadow text-sm"
        />

        <span className="text-gray-700 font-semibold">
          Total Employees: {filteredEmployees.length}
        </span>

        <Link
          to="/create-employee"
          className="bg-blue-600 text-white font-semibold px-3 py-1 rounded shadow text-sm"
        >
          Create Employee
        </Link>
      </nav>
      <div className="container py-10 ">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile</th>
              <th className="border border-gray-300 p-2">Designation</th>
              <th className="border border-gray-300 p-2">Gender</th>
              <th className="border border-gray-300 p-2">Courses</th>
              <th className="border border-gray-300 p-2">Date Created</th>

              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="border border-gray-300 p-2">
                    {employee._id.substring(6, 8)}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {employee.image && (
                      <img
                        src={`http://localhost:5000/images/${employee.image}`}
                        alt={employee.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {employee.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {employee.email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {employee.mobile}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {employee.designation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {employee.gender}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {renderCourses(employee.courses)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(employee.dateCreated).toLocaleDateString()}
                  </td>

                  <td className="border border-gray-300 p-2">
                    <Link to={`/edit-employee/${employee._id}`}>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
