// src/components/CreateEmployee.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import PageTitleNavbar from "./PageTitleNavbar"; // Ensure you import MainNavbar

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState({
    MCA: false,
    BCA: false,
    BSC: false,
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setCourses({
      ...courses,
      [e.target.name]: e.target.checked,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    return /^[0-9]+$/.test(mobile);
  };

  const checkEmailExists = async (email) => {
    if (!email) {
      return false;
    }
    const response = await fetch(
      `http://localhost:5000/api/employees/check-email?email=${encodeURIComponent(
        email
      )}`
    );
    const data = await response.json();
    return data.exists; // Assuming the response contains an 'exists' field
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setImage(selectedFile); // Valid file
      } else {
        setError("Only JPG or PNG files are allowed."); // Set error message for invalid file type
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validateMobile(mobile)) {
      setError("Mobile number must be numeric.");
      return;
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError("Email already exists.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("courses", JSON.stringify(courses)); // Assuming courses is an array
    if (image) {
      formData.append("image", image);
    }

    // Debugging formData before sending
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Employee created successfully");
        navigate("/employee-list");
      } else {
        const errorData = await response.json();
        console.error("Failed to create employee:", errorData);
        alert(errorData.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <MainNavbar />
      <PageTitleNavbar pageTitle="Create Employee" />
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mobile No:</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Designation:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Gender:</label>
            <label className="mr-4">
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Courses:</label>
            <label className="mr-4">
              <input
                type="checkbox"
                name="MCA"
                checked={courses.MCA}
                onChange={handleCheckboxChange}
              />
              MCA
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                name="BCA"
                checked={courses.BCA}
                onChange={handleCheckboxChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="BSC"
                checked={courses.BSC}
                onChange={handleCheckboxChange}
              />
              BSC
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Upload Image:</label>
            <input
              type="file"
              className="border border-gray-300 rounded"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
