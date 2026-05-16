import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={sidebarStyle}>
      <h3 style={{ marginTop: 0 }}>Menu</h3>

      {user?.role === "admin" && (
        <>
          <MenuLink to="/admin" text="🏠 Admin Dashboard" />
          <MenuLink to="/admin/students" text="🎓 Manage Students" />
        </>
      )}

      {user?.role === "student" && (
        <>
          <MenuLink to="/student" text="🏠 Home" />
          <MenuLink to="/student/profile" text="👤 Profile" />
          <MenuLink to="/student/classroom" text="📚 Classroom" />
          <MenuLink to="/student/resources" text="📁 Resources" />
          <MenuLink to="/student/course-registration" text="📝 Course Registration" />
          <MenuLink to="/student/examinations" text="📄 Examinations" />
          <MenuLink to="/student/messages" text="💬 Messages" />
          <MenuLink to="/student/help-center" text="🏫 Help Center" />
        </>
      )}

      {user?.role === "teacher" && (
        <>
          <MenuLink to="/teacher" text="🏠 Dashboard" />
          <MenuLink to="/teacher/resources" text="📁 Upload Resources" />
          <MenuLink to="/teacher/attendance" text="✅ Attendance" />
          <MenuLink to="/teacher/chat" text="💬 Chat With Students" />
        </>
      )}
    </div>
  );
}

function MenuLink({ to, text }) {
  return (
    <Link to={to} style={menuItemStyle}>
      {text}
    </Link>
  );
}

const sidebarStyle = {
  width: "240px",
  minHeight: "calc(100vh - 120px)",
  margin: "0 18px 18px",
  padding: "22px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.58)",
  backdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.75)",
  boxShadow: "0 20px 45px rgba(40,50,90,0.12)",
};

const menuItemStyle = {
  display: "block",
  padding: "13px 14px",
  marginBottom: "10px",
  borderRadius: "14px",
  color: "#374151",
  background: "rgba(255,255,255,0.55)",
  fontWeight: "600",
};

export default Sidebar;