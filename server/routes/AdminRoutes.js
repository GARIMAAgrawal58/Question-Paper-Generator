const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// Admin Register
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Trim inputs
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPass,
    });

    res.json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // Trim inputs
    email = email.trim();
    password = password.trim();

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email },
      "secret_key_here", // ⚠️ use .env in production
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, name: admin.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
