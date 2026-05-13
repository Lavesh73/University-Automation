import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function TeacherDashboard() {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px" }}>
          <h1>Teacher Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;