import { useState } from "react";
import axios from "axios";
import StudentPageLayout from "./StudentPageLayout";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(null);

  const handleImageUpdate = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("profile_image", image);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/account/profile-image/${user.id}`,
        data
      );

      const updatedUser = {
        ...user,
        profile_image: res.data.profile_image,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile image updated successfully");
      window.location.reload();
    } catch (error) {
      alert("Image update failed");
      console.log(error);
    }
  };

  return (
    <StudentPageLayout
      title="Student Profile"
      subtitle="View and update your personal and academic details."
    >
      <div className="glass-card" style={profileCard}>
        <div style={imageSection}>
          <img
            src={
              user?.profile_image
                ? `http://localhost:5000/uploads/${user.profile_image}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Student"
            style={studentImage}
          />

          <form onSubmit={handleImageUpdate} style={{ marginTop: "20px" }}>
            <input
              className="input-box"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button className="primary-btn">Change Image</button>
          </form>
        </div>

        <div>
          <h2>{user?.name || "Student Name"}</h2>
          <p>
            <b>Email:</b> {user?.email}
          </p>
          <p>
            <b>Role:</b> {user?.role}
          </p>
          <p>
            <b>Degree:</b> {user?.degree || "B.Tech"}
          </p>
          <p>
            <b>Department:</b> {user?.department || "Computer Science"}
          </p>
          <p>
            <b>Student ID:</b> STU{user?.id}
          </p>
          <p>
            <b>Semester:</b> 1
          </p>
          <p>
            <b>Status:</b> Active
          </p>
        </div>
      </div>
    </StudentPageLayout>
  );
}

const profileCard = {
  padding: "28px",
  maxWidth: "850px",
  display: "flex",
  gap: "35px",
  alignItems: "center",
};

const imageSection = {
  width: "250px",
  textAlign: "center",
};

const studentImage = {
  width: "160px",
  height: "160px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid white",
};

export default StudentProfile;