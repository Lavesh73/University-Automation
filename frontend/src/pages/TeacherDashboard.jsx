import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function TeacherDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const latestStudents = students.slice(0, 5);

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Teacher Dashboard</h1>

            <p style={{ color: "#6b7280" }}>
              Welcome {user?.name}. Manage classes, attendance, assignments,
              marks, notices, resources, and student communication.
            </p>

            <div style={gridStyle}>
              <Card title="Assigned Classes" value="4" />
              <Card title="Total Students" value={students.length} />
              <Card title="Assignments" value="8" />
              <Card title="Messages" value="3" />
            </div>

            <div className="glass-card" style={sectionStyle}>
              <h2>Latest Students</h2>

              {latestStudents.length === 0 ? (
                <p>No students found. Add students from Admin Panel.</p>
              ) : (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    {latestStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.roll_no}</td>
                        <td>{student.department}</td>
                        <td>{student.semester}</td>
                        <td>{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="glass-card" style={sectionStyle}>
              <h2>Today's Schedule</h2>

              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Room</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>09:00 AM</td>
                    <td>B.Tech CSE 6th Sem</td>
                    <td>Web Development</td>
                    <td>Lab 1</td>
                  </tr>

                  <tr>
                    <td>11:00 AM</td>
                    <td>B.Tech CSE 4th Sem</td>
                    <td>DBMS</td>
                    <td>Room 204</td>
                  </tr>

                  <tr>
                    <td>02:00 PM</td>
                    <td>B.Tech CSE 2nd Sem</td>
                    <td>Programming Fundamentals</td>
                    <td>Room 105</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card" style={sectionStyle}>
              <h2>Quick Actions</h2>

              <div style={buttonGrid}>
                <button className="primary-btn">Mark Attendance</button>
                <button className="primary-btn">Upload Assignment</button>
                <button className="primary-btn">Upload Notes</button>
                <button className="primary-btn">Enter Marks</button>
                <button className="primary-btn">Send Notice</button>
                <button className="primary-btn">Message Students</button>
              </div>
            </div>

            <div className="glass-card" style={sectionStyle}>
              <h2>Assigned Subjects</h2>

              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject</th>
                    <th>Class</th>
                    <th>Students</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>CS601</td>
                    <td>Web Development</td>
                    <td>CSE 6th Sem</td>
                    <td>{students.length}</td>
                  </tr>

                  <tr>
                    <td>CS402</td>
                    <td>Database Management System</td>
                    <td>CSE 4th Sem</td>
                    <td>{students.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="glass-card" style={{ padding: "24px", textAlign: "center" }}>
      <h2 style={{ color: "#7c4dff" }}>{value}</h2>
      <p>{title}</p>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "18px",
  marginTop: "25px",
};

const sectionStyle = {
  padding: "24px",
  marginTop: "25px",
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.65)",
  borderRadius: "18px",
  overflow: "hidden",
};

export default TeacherDashboard;