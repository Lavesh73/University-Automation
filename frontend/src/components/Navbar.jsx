import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={navbarStyle}>
      <div>
        <h2 style={{ margin: 0 }}>University Automation System</h2>
        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
          Welcome: {user?.name} ({user?.role})
        </p>
      </div>

      <button className="primary-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const navbarStyle = {
  margin: "18px",
  padding: "18px 24px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.65)",
  backdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.8)",
  boxShadow: "0 20px 45px rgba(40,50,90,0.12)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default Navbar;