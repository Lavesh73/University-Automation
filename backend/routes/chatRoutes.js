const express = require("express");
const router = express.Router();

const db = require("../db");

// SAVE MESSAGE
router.post("/send", (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  const sql =
    "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";

  db.query(sql, [sender_id, receiver_id, message], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Message sending failed",
        error: err.sqlMessage,
      });
    }

    res.status(201).json({
      message: "Message saved successfully",
    });
  });
});

// GET CHAT BETWEEN TWO USERS
router.get("/:user1/:user2", (req, res) => {
  const { user1, user2 } = req.params;

  const sql = `
    SELECT * FROM messages
    WHERE 
    (sender_id = ? AND receiver_id = ?)
    OR 
    (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `;

  db.query(sql, [user1, user2, user2, user1], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching messages",
      });
    }

    res.status(200).json(result);
  });
});

module.exports = router;