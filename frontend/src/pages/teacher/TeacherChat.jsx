import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const socket = io("http://localhost:5000");

function TeacherChat() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [students, setStudents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const messageInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const roomId = selectedStudent
    ? [user?.id, selectedStudent.id].sort().join("-")
    : "";

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }

    socket.on("receive_message", (data) => {
      if (data.roomId === roomId) {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startChat = async (student) => {
    setSelectedStudent(student);
    setShowDropdown(false);
    setChat([]);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${user?.id}/${student.id}`
      );

      setChat(res.data);

      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!selectedStudent) {
      alert("Please select a student first");
      return;
    }

    if (!message.trim()) {
      return;
    }

    const data = {
      roomId,
      sender_id: user?.id,
      receiver_id: selectedStudent.id,
      message,
    };

    try {
      await axios.post("http://localhost:5000/api/chat/send", data);

      socket.emit("send_message", data);
      setChat((prev) => [...prev, data]);

      setMessage("");

      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Chat With Students</h1>

            <p style={{ color: "#6b7280" }}>
              Select a student and click Chat Now to start chatting instantly.
            </p>

            <div style={dropdownWrapper}>
              <button
                className="secondary-btn"
                style={dropdownButton}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {selectedStudent
                  ? `${selectedStudent.name} (${selectedStudent.roll_no})`
                  : "Select Student"}
                <span>⌄</span>
              </button>

              {showDropdown && (
                <div className="glass-card" style={dropdownMenu}>
                  {students.length === 0 ? (
                    <p>No students found</p>
                  ) : (
                    students.map((student) => (
                      <div key={student.id} style={studentItem}>
                        <div>
                          <h3 style={{ margin: 0 }}>{student.name}</h3>

                          <p style={{ margin: "5px 0", color: "#6b7280" }}>
                            Roll No: {student.roll_no} | {student.department}
                          </p>

                          <p style={{ margin: 0, color: "#6b7280" }}>
                            {student.email}
                          </p>
                        </div>

                        <button
                          className="primary-btn"
                          onClick={() => startChat(student)}
                        >
                          Chat Now
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {selectedStudent ? (
              <>
                <div className="glass-card" style={selectedBox}>
                  <b>Chatting with:</b> {selectedStudent.name} |{" "}
                  <b>Roll No:</b> {selectedStudent.roll_no} |{" "}
                  <b>Department:</b> {selectedStudent.department}
                </div>

                <div style={chatBox}>
                  {chat.length === 0 ? (
                    <p style={{ color: "#6b7280" }}>
                      No messages yet. Start conversation with{" "}
                      {selectedStudent.name}.
                    </p>
                  ) : (
                    chat.map((item, index) => (
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
                        <b>
                          {item.sender_id === user?.id
                            ? "You"
                            : selectedStudent.name}
                        </b>
                        <p style={{ marginBottom: 0 }}>{item.message}</p>
                      </div>
                    ))
                  )}

                  <div ref={chatEndRef}></div>
                </div>

                <div style={inputArea}>
                  <input
                    ref={messageInputRef}
                    className="input-box"
                    placeholder={`Message ${selectedStudent.name}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleEnterKey}
                  />

                  <button className="primary-btn" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="glass-card" style={emptyChatBox}>
                <h2>Select a student to start chat</h2>
                <p style={{ color: "#6b7280" }}>
                  Press the dropdown arrow, choose any student, and click
                  Chat Now.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const dropdownWrapper = {
  position: "relative",
  marginTop: "25px",
  marginBottom: "20px",
  maxWidth: "650px",
};

const dropdownButton = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "16px",
};

const dropdownMenu = {
  position: "absolute",
  top: "60px",
  left: 0,
  width: "100%",
  maxHeight: "350px",
  overflowY: "auto",
  padding: "15px",
  zIndex: 10,
};

const studentItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  padding: "15px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.65)",
  marginBottom: "12px",
};

const selectedBox = {
  padding: "15px",
  marginBottom: "18px",
  color: "#374151",
};

const chatBox = {
  minHeight: "350px",
  maxHeight: "420px",
  overflowY: "auto",
  marginTop: "20px",
  padding: "18px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.45)",
};

const emptyChatBox = {
  padding: "35px",
  marginTop: "25px",
  textAlign: "center",
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