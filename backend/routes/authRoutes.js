const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const db = require("../db");

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    degree,
    department,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password, role, degree, department) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        role,
        degree,
        department,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Registration Failed",
            error: err.sqlMessage,
          });
        }

        res.status(201).json({
          message: "User Registered Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        degree: user.degree,
        department: user.department,
      },
    });
  });
});

module.exports = router;