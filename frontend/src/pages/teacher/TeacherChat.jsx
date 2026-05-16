import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const socket = io("http://localhost:5000");

function TeacherChat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const roomId = receiverId
    ? [user?.id, receiverId].sort().join("-")
    : "";

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
    if (!receiverId) return;

    const res = await axios.get(
      `http://localhost:5000/api/chat/${user?.id}/${receiverId}`
    );

    setChat(res.data);
  };

  const sendMessage = async () => {
    if (!receiverId || !message.trim()) {
      alert("Enter student user ID and message");
      return;
    }

    const data = {
      roomId,
      sender_id: user?.id,
      receiver_id: Number(receiverId),
      message,
    };

    await axios.post("http://localhost:5000/api/chat/send", data);

    socket.emit("send_message", data);

    setMessage("");
  };

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Chat With Students</h1>

            <div style={topBar}>
              <input
                className="input-box"
                placeholder="Enter Student User ID"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
              />

              <button className="primary-btn" onClick={fetchChat}>
                Load Chat
              </button>
            </div>

            <div style={chatBox}>
              {chat.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...messageStyle,
                    marginLeft:
                      item.sender_id === user?.id ? "auto" : "0",
                    background:
                      item.sender_id === user?.id
                        ? "rgba(124,77,255,0.16)"
                        : "rgba(255,255,255,0.75)",
                  }}
                >
                  <b>{item.sender_id === user?.id ? "You" : "Student"}</b>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>

            <div style={inputArea}>
              <input
                className="input-box"
                placeholder="Type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="primary-btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const topBar = {
  display: "grid",
  gridTemplateColumns: "1fr 140px",
  gap: "12px",
};

const chatBox = {
  minHeight: "350px",
  marginTop: "20px",
  padding: "18px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.45)",
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

export default TeacherChat;