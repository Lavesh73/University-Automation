import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import StudentPageLayout from "./StudentPageLayout";

const socket = io("http://localhost:5000");

function StudentMessages() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const roomId = teacherId ? [user?.id, teacherId].sort().join("-") : "";

  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  const fetchChat = async () => {
    if (!teacherId) {
      alert("Enter teacher user ID");
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/chat/${user?.id}/${teacherId}`
    );

    setChat(res.data);
  };

  const sendMessage = async () => {
    if (!teacherId || !message.trim()) {
      alert("Enter teacher ID and message");
      return;
    }

    const data = {
      roomId,
      sender_id: user?.id,
      receiver_id: Number(teacherId),
      message,
    };

    await axios.post("http://localhost:5000/api/chat/send", data);

    socket.emit("send_message", data);

    setMessage("");
  };

  return (
    <StudentPageLayout
      title="Messages"
      subtitle="Chat directly with your teacher in real time."
    >
      <div style={topBar}>
        <input
          className="input-box"
          placeholder="Enter Teacher User ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />

        <button className="primary-btn" onClick={fetchChat}>
          Load Chat
        </button>
      </div>

      <div className="glass-card" style={chatBox}>
        {chat.map((item, index) => (
          <div
            key={index}
            style={{
              ...messageStyle,
              marginLeft: item.sender_id === user?.id ? "auto" : "0",
              background:
                item.sender_id === user?.id
                  ? "rgba(124,77,255,0.16)"
                  : "rgba(255,255,255,0.75)",
            }}
          >
            <b>{item.sender_id === user?.id ? "You" : "Teacher"}</b>
            <p>{item.message}</p>
          </div>
        ))}
      </div>

      <div style={inputArea}>
        <input
          className="input-box"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="primary-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </StudentPageLayout>
  );
}

const topBar = {
  display: "grid",
  gridTemplateColumns: "1fr 140px",
  gap: "12px",
};

const chatBox = {
  minHeight: "350px",
  padding: "18px",
  marginTop: "20px",
};

const messageStyle = {
  width: "55%",
  padding: "14px",
  borderRadius: "16px",
  marginBottom: "12px",
};

const inputArea = {
  display: "grid",
  gridTemplateColumns: "1fr 120px",
  gap: "12px",
  marginTop: "15px",
};

export default StudentMessages;