import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="student-page">
      <div className="top-header">
        <div className="logo">University Portal</div>

        <div className="search-box">
          <input type="text" placeholder="Search University Portal" />
        </div>

        <div className="header-icons">
          <span>🔔</span>
          <span>👤</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <div>
          <div className="profile-card">
            <div className="profile-cover"></div>

            <div className="profile-info">
              <div className="avatar"></div>

              <h3>{user?.name || "Student Name"}</h3>
              <p>Student ID: STU001</p>
              <p>B.Tech Computer Science Engineering</p>
              <p>Student Dashboard</p>
            </div>
          </div>

          <div className="side-menu">
            <div className="menu-item">🏠 Home</div>
            <div className="menu-item">👤 Profile</div>
            <div className="menu-item">📚 Classroom</div>
            <div className="menu-item">📝 Course Registration</div>
            <div className="menu-item">📢 Feedback</div>
            <div className="menu-item">📄 Examinations</div>
            <div className="menu-item">💻 Online Exam</div>
            <div className="menu-item">📅 Calendar</div>
            <div className="menu-item">🎓 Placements</div>
            <div className="menu-item">💬 Message</div>
            <div className="menu-item">🏫 Campus Help Center</div>
            <div className="menu-item">🏠 Hostel</div>
            <div className="menu-item">🚪 Gate Pass</div>
          </div>
        </div>

        <div className="main-section">
          <div className="card">
            <h2>Admission Process</h2>

            <div className="admission-actions">
              <button className="primary-btn">
                Fill admission form
              </button>

              <button className="secondary-btn">
                Pay fee online
              </button>
            </div>
          </div>

          <div className="post-actions">
            <div className="post-action">✏️ Post</div>
            <div className="post-action">❓ Ask Question</div>
            <div className="post-action">📅 Add Event</div>
          </div>

          <div className="card notice-card">
            <p className="notice-meta">UNIVERSITY ADMINISTRATION</p>
            <p className="notice-date">Today</p>

            <h3>
              Examination Form and Fee Submission Notice
            </h3>

            <p>Dear Student,</p>

            <p>
              All students are informed that the examination form and fee
              submission process is currently open. Students are advised to
              complete the required process before the deadline.
            </p>

            <ul>
              <li>Submit examination form before the last date</li>
              <li>Pay semester or examination fee on time</li>
              <li>Contact administration for any query</li>
            </ul>

            <p>
              Students should regularly check the portal for notices,
              assignments, academic updates, and important announcements.
            </p>
          </div>
        </div>

        <div className="right-panel">
          <div className="reminder-card">
            <h3>Password Expiry Reminder</h3>
            <p>
              Your portal password may expire soon. Please update your password
              regularly for account security.
            </p>
          </div>

          <div className="reminder-card">
            <h3>Upcoming Events</h3>
            <p>Internal assessment submission deadline is near.</p>
          </div>

          <div className="reminder-card">
            <h3>Fee Reminder</h3>
            <p>Semester fee payment window is currently open.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;