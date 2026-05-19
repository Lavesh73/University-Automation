const express = require("express");
const router = express.Router();

const db = require("../db");

// CREATE ATTENDANCE SESSION
router.post("/session", (req, res) => {
  const { subject, class_name, teacher_id, session_start } = req.body;

  const sql =
    "INSERT INTO attendance_sessions (subject, class_name, teacher_id, session_start) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [subject, class_name, teacher_id, session_start],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Session creation failed",
          error: err.sqlMessage,
        });
      }

      res.status(201).json({
        message: "Attendance session created",
        session_id: result.insertId,
      });
    }
  );
});

// GET ALL STUDENTS
router.get("/students", (req, res) => {
  const sql = "SELECT * FROM students ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching students",
        error: err.sqlMessage,
      });
    }

    res.status(200).json(result);
  });
});

// MARK OR UPDATE ATTENDANCE WITH 12 HOUR LIMIT
router.post("/mark", (req, res) => {
  const { session_id, student_id, status } = req.body;

  const checkSql = `
    SELECT * FROM attendance_sessions
    WHERE id = ?
    AND TIMESTAMPDIFF(HOUR, session_start, NOW()) <= 12
  `;

  db.query(checkSql, [session_id], (err, sessionResult) => {
    if (err) {
      return res.status(500).json({
        message: "Session check failed",
        error: err.sqlMessage,
      });
    }

    if (sessionResult.length === 0) {
      return res.status(403).json({
        message:
          "Attendance editing time expired. You can edit only within 12 hours.",
      });
    }

    const sql = `
      INSERT INTO attendance_records (session_id, student_id, status)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE status = ?
    `;

    db.query(sql, [session_id, student_id, status, status], (err2) => {
      if (err2) {
        return res.status(500).json({
          message: "Attendance marking failed",
          error: err2.sqlMessage,
        });
      }

      res.status(200).json({
        message: "Attendance updated successfully",
      });
    });
  });
});

// GET ATTENDANCE RECORDS OF ONE SESSION
router.get("/records/:session_id", (req, res) => {
  const sql = `
    SELECT 
      students.id,
      students.name,
      students.roll_no,
      students.department,
      students.semester,
      attendance_records.status
    FROM students
    LEFT JOIN attendance_records
    ON students.id = attendance_records.student_id
    AND attendance_records.session_id = ?
    ORDER BY students.id DESC
  `;

  db.query(sql, [req.params.session_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching attendance",
        error: err.sqlMessage,
      });
    }

    res.status(200).json(result);
  });
});

// GET ATTENDANCE SUMMARY FOR ONE SESSION
router.get("/summary/:session_id", (req, res) => {
  const sql = `
    SELECT 
      attendance_sessions.id,
      attendance_sessions.subject,
      attendance_sessions.class_name,
      attendance_sessions.session_start,
      COUNT(attendance_records.id) AS marked_count,
      SUM(attendance_records.status = 'Present') AS present_count,
      SUM(attendance_records.status = 'Absent') AS absent_count,
      TIMESTAMPDIFF(HOUR, attendance_sessions.session_start, NOW()) AS hours_passed
    FROM attendance_sessions
    LEFT JOIN attendance_records
    ON attendance_sessions.id = attendance_records.session_id
    WHERE attendance_sessions.id = ?
    GROUP BY attendance_sessions.id
  `;

  db.query(sql, [req.params.session_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching summary",
        error: err.sqlMessage,
      });
    }

    res.status(200).json(result[0]);
  });
});

// GET ALL PREVIOUS ATTENDANCE SESSIONS
router.get("/sessions", (req, res) => {
  const sql = `
    SELECT 
      attendance_sessions.id,
      attendance_sessions.subject,
      attendance_sessions.class_name,
      attendance_sessions.session_start,
      COUNT(attendance_records.id) AS marked_count,
      SUM(attendance_records.status = 'Present') AS present_count,
      SUM(attendance_records.status = 'Absent') AS absent_count,
      TIMESTAMPDIFF(HOUR, attendance_sessions.session_start, NOW()) AS hours_passed
    FROM attendance_sessions
    LEFT JOIN attendance_records
    ON attendance_sessions.id = attendance_records.session_id
    GROUP BY attendance_sessions.id
    ORDER BY attendance_sessions.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching sessions",
        error: err.sqlMessage,
      });
    }

    res.status(200).json(result);
  });
});
// GET STUDENT OVERALL ATTENDANCE SUMMARY
router.get("/student-summary/:student_id", (req, res) => {
  const studentId = req.params.student_id;

  const sql = `
    SELECT 
      COUNT(*) AS total_classes,
      SUM(status = 'Present') AS attended_classes,
      SUM(status = 'Absent') AS absent_classes
    FROM attendance_records
    WHERE student_id = ?
  `;

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching student attendance",
        error: err.sqlMessage,
      });
    }

    const total = result[0].total_classes || 0;
    const attended = result[0].attended_classes || 0;
    const absent = result[0].absent_classes || 0;

    const percentage = total === 0 ? 0 : Math.round((attended / total) * 100);

    res.status(200).json({
      total_classes: total,
      attended_classes: attended,
      absent_classes: absent,
      percentage,
    });
  });
});
module.exports = router;