const express = require("express");
const router = express.Router();

const db = require("../db");

// ADD STUDENT
router.post("/add", (req, res) => {
  const { name, email, roll_no, department, semester, phone } = req.body;

  const sql =
    "INSERT INTO students (name, email, roll_no, department, semester, phone) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, roll_no, department, semester, phone],
    (err, result) => {
      if (err) {
        console.log("Add Student Error:", err.sqlMessage);

        return res.status(500).json({
          message: "Error adding student",
          error: err.sqlMessage,
        });
      }

      res.status(201).json({
        message: "Student Added Successfully",
      });
    }
  );
});

// GET ALL STUDENTS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM students ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Fetch Students Error:", err.sqlMessage);

      return res.status(500).json({
        message: "Error fetching students",
        error: err.sqlMessage,
      });
    }

    res.status(200).json(result);
  });
});

// DELETE STUDENT
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Delete Student Error:", err.sqlMessage);

      return res.status(500).json({
        message: "Error deleting student",
        error: err.sqlMessage,
      });
    }

    res.status(200).json({
      message: "Student Deleted Successfully",
    });
  });
});
// GET STUDENT BY EMAIL
router.get("/by-email/:email", (req, res) => {
  const email = req.params.email;

  const sql = "SELECT * FROM students WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching student",
        error: err.sqlMessage,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(result[0]);
  });
});
module.exports = router;