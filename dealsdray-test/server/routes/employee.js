// routes/employee.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee.js");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Save files to the "images" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid naming conflicts
  },
});

const upload = multer({ storage });

const checkEmailUnique = async (req, res, next) => {
  const { email } = req.body;
  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    return res.status(400).json({ message: "Email already exists." });
  }
  next(); // Proceed to the next middleware or route handler
};
// Create Employee
router.post("/", upload.single("image"), async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;

    // Validation checks
    if (!name || !email || !mobile || !designation || !gender || !courses) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const parsedCourses = JSON.parse(courses || "[]");
    const image = req.file ? req.file.filename : null;

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: parsedCourses,
      image,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);

    if (error.code === 11000) {
      // MongoDB error code for duplicate key
      return res.status(400).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Error creating employee", error });
  }
});

// Get Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// Get Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
});

// Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

// Update Employee
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;

  const { name, email, mobile, designation, gender, courses } = req.body;

  try {
    // Fetch the existing employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check for email duplication
    if (employee.email !== email) {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }

    // Update employee fields
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.courses = courses ? JSON.parse(courses) : employee.courses;
    employee.image = req.file ? req.file.filename : employee.image; // Update only if a new file is uploaded

    // Save the updated employee
    await employee.save();
    res.json(employee); // Send updated employee back
  } catch (error) {
    console.error("Failed to update employee:", error.response.data);
    console.error("Error updating employee:", error);
    res.status(400).json({ message: error.message }); // Send validation error message
  }
});

router.get("/check-email", async (req, res) => {
  const { email } = req.query;

  try {
    console.log("Checking email:", email);
    const employee = await Employee.findOne({ email });
    if (employee) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
