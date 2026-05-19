const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profile_image"), async (req, res) => {
  const { name, email, password, role, degree, department } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userSql =
      "INSERT INTO users (name, email, password, role, degree, department, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(
      userSql,
      [name, email, hashedPassword, role, degree, department, profileImage],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Registration Failed",
            error: err.sqlMessage,
          });
        }

        const userId = result.insertId;

        if (role === "student") {
          const rollNo = `STU${userId}`;

          const studentSql =
            "INSERT INTO students (name, email, roll_no, department, semester, phone, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)";

          db.query(
            studentSql,
            [
              name,
              email,
              rollNo,
              department || "Not Assigned",
              "1",
              "",
              profileImage,
            ],
            (studentErr) => {
              if (studentErr) {
                return res.status(500).json({
                  message: "User created but student profile failed",
                  error: studentErr.sqlMessage,
                });
              }

              return res.status(201).json({
                message: "User Registered Successfully",
              });
            }
          );
        } else {
          return res.status(201).json({
            message: "User Registered Successfully",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
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

    const isMatch = await bcrypt.compare(password, user.password);

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
        profile_image: user.profile_image,
      },
    });
  });
});

module.exports = router;