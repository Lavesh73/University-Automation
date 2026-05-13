import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div
      style={{
        background: "#222",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2>University Automation System</h2>

        <p>
          Welcome: {user?.name} ({user?.role})
        </p>
      </div>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;