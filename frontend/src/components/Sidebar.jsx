import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        background: "#333",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>
        </li>

        <br />

        <li>
          <Link to="/student" style={{ color: "white" }}>
            Student Dashboard
          </Link>
        </li>

        <br />

        <li>
          <Link to="/teacher" style={{ color: "white" }}>
            Teacher Dashboard
          </Link>
        </li>

        <br />

        <li>
          <Link to="/admin" style={{ color: "white" }}>
            Admin Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;