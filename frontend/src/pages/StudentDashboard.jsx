import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Student Dashboard</h1>
            <p style={{ color: "#6b7280" }}>
              Welcome {user?.name}. Access your academic activities, fees,
              notices, and student services from here.
            </p>

            <div style={gridStyle}>
              <Card title="Attendance" value="86%" />
              <Card title="Pending Fees" value="₹12,000" />
              <Card title="Assignments" value="5" />
              <Card title="Notices" value="8" />
            </div>

            <div style={sectionGrid}>
              <div className="glass-card" style={sectionStyle}>
                <h2>Admission Process</h2>
                <p>Complete your academic admission and fee formalities.</p>
                <button className="primary-btn">Fill Admission Form</button>{" "}
                <button className="secondary-btn">Pay Fee Online</button>
              </div>

              <div className="glass-card" style={sectionStyle}>
                <h2>Recent Notice</h2>
                <h3>Examination Form Submission</h3>
                <p>
                  Students are advised to submit examination forms before the
                  deadline and regularly check portal updates.
                </p>
              </div>
            </div>

            <div className="glass-card" style={sectionStyle}>
              <h2>Quick Services</h2>
              <div style={buttonGrid}>
                <button className="primary-btn">View Attendance</button>
                <button className="primary-btn">Download Notes</button>
                <button className="primary-btn">Submit Assignment</button>
                <button className="primary-btn">View Result</button>
                <button className="primary-btn">Messages</button>
                <button className="primary-btn">Help Center</button>
              </div>
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