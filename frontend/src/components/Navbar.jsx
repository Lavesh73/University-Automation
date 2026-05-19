import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account and related data."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/account/delete/${user.id}`);

      localStorage.removeItem("user");

      alert("Account deleted successfully");
      navigate("/");
    } catch (error) {
      alert("Account delete failed");
      console.log(error);
    }
  };

  return (
    <div style={navbarStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={
            user?.profile_image
              ? `http://localhost:5000/uploads/${user.profile_image}`
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          style={profileImg}
        />

        <div>
          <h2 style={{ margin: 0 }}>University Automation System</h2>

          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Welcome: {user?.name} ({user?.role})
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>

        {user?.role !== "admin" && (
          <button style={deleteBtn} onClick={handleDeleteAccount}>
            Delete Account
          </button>
        )}
      </div>
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

const profileImg = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid white",
};

const deleteBtn = {
  background: "rgba(255,0,0,0.12)",
  color: "red",
  border: "1px solid rgba(255,0,0,0.25)",
  borderRadius: "14px",
  padding: "12px 18px",
  fontWeight: "700",
  cursor: "pointer",
};

export default Navbar;