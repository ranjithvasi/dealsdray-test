const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Email regex
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]+$/.test(v); // Numeric validation
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: Object, required: true }, // Ensure this matches how you're sending courses
  image: { type: String },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  }, // Auto-generated ID
  dateCreated: { type: Date, default: Date.now }, // Automatically set to current date
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
