const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const db = require("../db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// TEACHER UPLOAD MATERIAL
router.post("/upload", upload.single("file"), (req, res) => {
  const { title, subject, uploaded_by } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const sql =
    "INSERT INTO materials (title, subject, uploaded_by, file_name, file_path) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      title,
      subject,
      uploaded_by,
      req.file.originalname,
      req.file.filename,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "File upload failed",
          error: err.sqlMessage,
        });
      }

      res.status(201).json({
        message: "Material uploaded successfully",
      });
    }
  );
});

// STUDENT GET MATERIALS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM materials ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching materials",
      });
    }

    res.status(200).json(result);
  });
});

// DOWNLOAD FILE
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads",
    req.params.filename
  );

  res.download(filePath);
});

module.exports = router;