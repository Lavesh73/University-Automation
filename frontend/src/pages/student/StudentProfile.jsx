import StudentPageLayout from "./StudentPageLayout";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <StudentPageLayout
      title="Student Profile"
      subtitle="View your personal and academic details."
    >
      <div className="glass-card" style={profileCard}>
        <div style={imageBox}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Student"
            style={studentImage}
          />
        </div>

        <div>
          <h2>{user?.name || "Student Name"}</h2>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Role:</b> {user?.role}</p>
          <p><b>Degree:</b> {user?.degree || "B.Tech"}</p>
          <p><b>Department:</b> {user?.department || "Computer Science"}</p>
          <p><b>Student ID:</b> STU001</p>
          <p><b>Semester:</b> 6</p>
          <p><b>Phone:</b> 9876543210</p>
          <p><b>Status:</b> Active</p>
        </div>
      </div>
    </StudentPageLayout>
  );
}

const profileCard = {
  padding: "28px",
  maxWidth: "750px",
  display: "flex",
  gap: "30px",
  alignItems: "center",
};

const imageBox = {
  width: "160px",
  height: "160px",
  borderRadius: "50%",
  background: "rgba(124,77,255,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const studentImage = {
  width: "130px",
  height: "130px",
  borderRadius: "50%",
  objectFit: "cover",
};

export default StudentProfile;