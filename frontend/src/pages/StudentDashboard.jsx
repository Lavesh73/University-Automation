import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [attendance, setAttendance] = useState({
    percentage: 0,
    attended_classes: 0,
    total_classes: 0,
    absent_classes: 0,
  });

  useEffect(() => {
    fetchStudentAttendance();
  }, []);

  const fetchStudentAttendance = async () => {
    try {
      const studentRes = await axios.get(
        `http://localhost:5000/api/students/by-email/${user?.email}`
      );

      const studentId = studentRes.data.id;

      const attendanceRes = await axios.get(
        `http://localhost:5000/api/attendance/student-summary/${studentId}`
      );

      setAttendance(attendanceRes.data);
    } catch (error) {
      setAttendance({
        percentage: 0,
        attended_classes: 0,
        total_classes: 0,
        absent_classes: 0,
      });
    }
  };

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Student Dashboard</h1>

            <p style={{ color: "#6b7280" }}>
              Welcome {user?.name}. Access your attendance, resources,
              assignments, results, messages and student services from here.
            </p>

            <div style={gridStyle}>
              <Card
                title="Attendance"
                value={`${attendance.percentage}%`}
                subtitle={`${attendance.attended_classes}/${attendance.total_classes} classes`}
              />

              <Card title="Pending Fees" value="₹0" subtitle="No pending data" />
              <Card title="Assignments" value="0" subtitle="No new assignment" />
              <Card title="Notices" value="0" subtitle="No new notice" />
            </div>

            <div style={sectionGrid}>
              <div className="glass-card" style={sectionStyle}>
                <h2>Academic Overview</h2>

                <p>
                  Your current attendance is{" "}
                  <b>{attendance.percentage}%</b>.
                </p>

                <p>
                  You attended <b>{attendance.attended_classes}</b> classes out
                  of <b>{attendance.total_classes}</b>.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/classroom")}
                >
                  View Attendance
                </button>
              </div>

              <div className="glass-card" style={sectionStyle}>
                <h2>Recent Notice</h2>

                <p>
                  Important academic updates, examination notices and class
                  announcements will appear here.
                </p>

                <button
                  className="secondary-btn"
                  onClick={() => navigate("/student/examinations")}
                >
                  View Examination
                </button>
              </div>
            </div>

            <div className="glass-card" style={sectionStyle}>
              <h2>Quick Services</h2>

              <div style={buttonGrid}>
                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/classroom")}
                >
                  View Attendance
                </button>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/resources")}
                >
                  Download Notes
                </button>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/classroom")}
                >
                  Submit Assignment
                </button>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/examinations")}
                >
                  View Result
                </button>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/messages")}
                >
                  Messages
                </button>

                <button
                  className="primary-btn"
                  onClick={() => navigate("/student/help-center")}
                >
                  Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, subtitle }) {
  return (
    <div className="glass-card" style={{ padding: "24px", textAlign: "center" }}>
      <h2 style={{ color: "#7c4dff" }}>{value}</h2>
      <p>{title}</p>
      <small style={{ color: "#6b7280" }}>{subtitle}</small>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "18px",
  marginTop: "25px",
};

const sectionGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
  marginTop: "25px",
};

const sectionStyle = {
  padding: "24px",
  marginTop: "20px",
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
};

export default StudentDashboard;