import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <div>
          <h1>Teacher Dashboard</h1>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="teacher-container">
        <div className="teacher-sidebar">
          <div className="teacher-profile">
            <div className="teacher-avatar">👨‍🏫</div>
            <h2>{user?.name || "Teacher"}</h2>
            <p>{user?.email}</p>
            <p>Department: Computer Science</p>
          </div>

          <div className="teacher-menu">
            <div>🏠 Dashboard</div>
            <div>📚 My Classes</div>
            <div>📝 Assignments</div>
            <div>✅ Attendance</div>
            <div>📊 Marks Entry</div>
            <div>📢 Notices</div>
            <div>💬 Student Messages</div>
            <div>📁 Study Material</div>
            <div>📅 Timetable</div>
          </div>
        </div>

        <div className="teacher-main">
          <div className="stats-grid">
            <div className="stat-card">
              <h2>4</h2>
              <p>Assigned Classes</p>
            </div>

            <div className="stat-card">
              <h2>120</h2>
              <p>Total Students</p>
            </div>

            <div className="stat-card">
              <h2>8</h2>
              <p>Pending Assignments</p>
            </div>

            <div className="stat-card">
              <h2>3</h2>
              <p>New Messages</p>
            </div>
          </div>

          <div className="section-card">
            <h2>Today's Schedule</h2>

            <table className="table">
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
                  <td>09:00 AM - 10:00 AM</td>
                  <td>B.Tech CSE 6th Sem</td>
                  <td>Web Development</td>
                  <td>Lab 1</td>
                </tr>

                <tr>
                  <td>11:00 AM - 12:00 PM</td>
                  <td>B.Tech CSE 4th Sem</td>
                  <td>Database Management System</td>
                  <td>Room 204</td>
                </tr>

                <tr>
                  <td>02:00 PM - 03:00 PM</td>
                  <td>B.Tech CSE 2nd Sem</td>
                  <td>Programming Fundamentals</td>
                  <td>Room 105</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-card">
            <h2>Quick Actions</h2>

            <div className="quick-actions">
              <button className="action-btn">Mark Attendance</button>
              <button className="action-btn">Upload Assignment</button>
              <button className="action-btn">Upload Notes</button>
              <button className="action-btn">Enter Marks</button>
              <button className="action-btn">Send Notice</button>
              <button className="action-btn">Message Students</button>
            </div>
          </div>

          <div className="section-card">
            <h2>Assigned Subjects</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Class</th>
                  <th>Total Students</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>CS601</td>
                  <td>Web Development</td>
                  <td>CSE 6th Sem</td>
                  <td>45</td>
                </tr>

                <tr>
                  <td>CS402</td>
                  <td>Database Management System</td>
                  <td>CSE 4th Sem</td>
                  <td>38</td>
                </tr>

                <tr>
                  <td>CS201</td>
                  <td>Programming Fundamentals</td>
                  <td>CSE 2nd Sem</td>
                  <td>37</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-card">
            <h2>Recent Student Queries</h2>

            <div className="notice-box">
              <strong>Rahul Sharma:</strong> Sir, please upload DBMS assignment deadline.
            </div>

            <div className="notice-box">
              <strong>Anjali Verma:</strong> Sir, attendance is not updated for yesterday's lab.
            </div>

            <div className="notice-box">
              <strong>Mohit Singh:</strong> Sir, please share notes for normalization topic.
            </div>
          </div>

          <div className="section-card">
            <h2>Important Reminders</h2>

            <div className="notice-box">
              Submit internal marks before the end of this week.
            </div>

            <div className="notice-box">
              Upload study material for upcoming mid-term examination.
            </div>

            <div className="notice-box">
              Verify attendance records for all assigned classes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;