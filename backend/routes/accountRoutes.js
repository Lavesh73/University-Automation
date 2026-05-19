const express = require("express");
const router = express.Router();
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

// UPDATE PROFILE IMAGE
router.put("/profile-image/:id", upload.single("profile_image"), (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    return res.status(400).json({
      message: "No image uploaded",
    });
  }

  const imageName = req.file.filename;

  const getUserSql = "SELECT * FROM users WHERE id = ?";

  db.query(getUserSql, [userId], (err, userResult) => {
    if (err || userResult.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = userResult[0];

    const updateUserSql = "UPDATE users SET profile_image = ? WHERE id = ?";

    db.query(updateUserSql, [imageName, userId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({
          message: "Profile image update failed",
          error: updateErr.sqlMessage,
        });
      }

      if (user.role === "student") {
        const updateStudentSql =
          "UPDATE students SET profile_image = ? WHERE email = ?";

        db.query(updateStudentSql, [imageName, user.email]);
      }

      res.status(200).json({
        message: "Profile image updated successfully",
        profile_image: imageName,
      });
    });
  });
});

// DELETE USER ACCOUNT FULLY
router.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;

  const getUserSql = "SELECT * FROM users WHERE id = ?";

  db.query(getUserSql, [userId], (err, userResult) => {
    if (err || userResult.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = userResult[0];

    if (user.role === "student") {
      const getStudentSql = "SELECT * FROM students WHERE email = ?";

      db.query(getStudentSql, [user.email], (studentErr, studentResult) => {
        if (studentResult.length > 0) {
          const studentId = studentResult[0].id;

          db.query("DELETE FROM attendance_records WHERE student_id = ?", [
            studentId,
          ]);

          db.query("DELETE FROM students WHERE id = ?", [studentId]);
        }

        db.query("DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?", [
          userId,
          userId,
        ]);

        db.query("DELETE FROM users WHERE id = ?", [userId], (deleteErr) => {
          if (deleteErr) {
            return res.status(500).json({
              message: "Account delete failed",
              error: deleteErr.sqlMessage,
            });
          }

          res.status(200).json({
            message: "Account deleted successfully",
          });
        });
      });
    } else if (user.role === "teacher") {
      db.query("DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?", [
        userId,
        userId,
      ]);

      db.query("DELETE FROM materials WHERE uploaded_by = ?", [userId]);

      db.query("DELETE FROM attendance_sessions WHERE teacher_id = ?", [
        userId,
      ]);

      db.query("DELETE FROM users WHERE id = ?", [userId], (deleteErr) => {
        if (deleteErr) {
          return res.status(500).json({
            message: "Account delete failed",
            error: deleteErr.sqlMessage,
          });
        }

        res.status(200).json({
          message: "Account deleted successfully",
        });
      });
    } else {
      db.query("DELETE FROM users WHERE id = ?", [userId], (deleteErr) => {
        if (deleteErr) {
          return res.status(500).json({
            message: "Account delete failed",
            error: deleteErr.sqlMessage,
          });
        }

        res.status(200).json({
          message: "Account deleted successfully",
        });
      });
    }
  });
});

module.exports = router;