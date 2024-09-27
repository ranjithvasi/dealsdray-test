const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route    POST api/auth/register
// @desc     Register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/auth/login
// @desc     Authenticate user & get token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res
      .status(200)
      .json({ message: "Login successful", username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
