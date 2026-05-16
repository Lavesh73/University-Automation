import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Admin Dashboard</h1>
            <p style={{ color: "#6b7280" }}>
              Manage university operations from one central panel.
            </p>

            <div style={gridStyle}>
              <Card title="Total Students" value="120" />
              <Card title="Total Teachers" value="18" />
              <Card title="Pending Fees" value="32" />
              <Card title="Notices" value="8" />
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

export default AdminDashboard;