import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function StudentDashboard() {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px" }}>
          <h1>Student Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;