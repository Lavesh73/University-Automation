import { useState } from "react";
import { useParams } from "react-router-dom";
import StudentPageLayout from "./StudentPageLayout";

function ClassroomDetails() {
  const { subjectId } = useParams();
  const [activeTab, setActiveTab] = useState("attendance");
  const [message, setMessage] = useState("");

  const subjectName = subjectId
    .split("-")
    .map((word) => word.toUpperCase())
    .join(" ");

  const attendanceData = [
    {
      date: "16-05-2026",
      time: "09:00 AM - 10:00 AM",
      topic: "Introduction Lecture",
      status: "Present",
    },
    {
      date: "17-05-2026",
      time: "09:00 AM - 10:00 AM",
      topic: "Core Concepts",
      status: "Present",
    },
    {
      date: "18-05-2026",
      time: "09:00 AM - 10:00 AM",
      topic: "Practical Lab",
      status: "Absent",
    },
    {
      date: "19-05-2026",
      time: "09:00 AM - 10:00 AM",
      topic: "Assignment Discussion",
      status: "Present",
    },
  ];

  const resources = [
    {
      title: "Unit 1 Notes",
      type: "PDF",
      uploadedBy: "Teacher",
      date: "16-05-2026",
    },
    {
      title: "Important Questions",
      type: "DOCX",
      uploadedBy: "Teacher",
      date: "17-05-2026",
    },
    {
      title: "Lab Manual",
      type: "PDF",
      uploadedBy: "Teacher",
      date: "18-05-2026",
    },
  ];

  const assignments = [
    {
      title: "Assignment 1",
      topic: "Basic Concepts",
      dueDate: "22-05-2026",
      status: "Pending",
    },
    {
      title: "Assignment 2",
      topic: "Practical Questions",
      dueDate: "25-05-2026",
      status: "Submitted",
    },
  ];

  const chats = [
    {
      sender: "Teacher",
      text: "Please submit your assignment before the deadline.",
    },
    {
      sender: "Student",
      text: "Okay sir, I will submit it today.",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please type a message");
      return;
    }

    alert("Message sent to teacher");
    setMessage("");
  };

  return (
    <StudentPageLayout
      title={subjectName}
      subtitle="Manage attendance, resources, chat and assignments for this classroom."
    >
      <div style={tabContainer}>
        <button
          className={activeTab === "attendance" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </button>

        <button
          className={activeTab === "resources" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>

        <button
          className={activeTab === "chat" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>

        <button
          className={activeTab === "assignments" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("assignments")}
        >
          Assignments
        </button>
      </div>

      {activeTab === "attendance" && (
        <div className="glass-card" style={sectionStyle}>
          <h2>Class Attendance</h2>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Topic</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.topic}</td>
                  <td
                    style={{
                      color: item.status === "Present" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "resources" && (
        <div className="glass-card" style={sectionStyle}>
          <h2>Resources Uploaded By Teacher</h2>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {resources.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>{item.uploadedBy}</td>
                  <td>{item.date}</td>
                  <td>
                    <button className="secondary-btn">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "chat" && (
        <div className="glass-card" style={sectionStyle}>
          <h2>Chat With Teacher</h2>

          <div style={chatBox}>
            {chats.map((chat, index) => (
              <div
                key={index}
                style={{
                  ...messageStyle,
                  marginLeft: chat.sender === "Student" ? "auto" : "0",
                  background:
                    chat.sender === "Student"
                      ? "rgba(124,77,255,0.16)"
                      : "rgba(255,255,255,0.75)",
                }}
              >
                <b>{chat.sender}</b>
                <p>{chat.text}</p>
              </div>
            ))}
          </div>

          <div style={messageInputBox}>
            <input
              className="input-box"
              placeholder="Type message to teacher..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="primary-btn" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}

      {activeTab === "assignments" && (
        <div className="glass-card" style={sectionStyle}>
          <h2>Assignments Given By Teacher</h2>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Topic</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.topic}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="secondary-btn">Submit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </StudentPageLayout>
  );
}

const tabContainer = {
  display: "flex",
  gap: "14px",
  marginBottom: "25px",
  flexWrap: "wrap",
};

const sectionStyle = {
  padding: "24px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.65)",
  borderRadius: "18px",
  overflow: "hidden",
};

const chatBox = {
  minHeight: "230px",
  padding: "15px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.45)",
  marginBottom: "18px",
};

const messageStyle = {
  width: "60%",
  padding: "12px 16px",
  borderRadius: "16px",
  marginBottom: "12px",
};

const messageInputBox = {
  display: "grid",
  gridTemplateColumns: "1fr 120px",
  gap: "12px",
};

export default ClassroomDetails;