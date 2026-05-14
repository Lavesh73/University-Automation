import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        width: "220px",
        background: "#333",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/admin" style={{ color: "white" }}>
                Admin Dashboard
              </Link>
            </li>

            <br />

            <li>
              <Link to="/admin/students" style={{ color: "white" }}>
                Manage Students
              </Link>
            </li>
          </>
        )}

        {user?.role === "student" && (
          <li>
            <Link to="/student" style={{ color: "white" }}>
              Student Dashboard
            </Link>
          </li>
        )}

        {user?.role === "teacher" && (
          <li>
            <Link to="/teacher" style={{ color: "white" }}>
              Teacher Dashboard
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;