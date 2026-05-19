import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    degree: "",
    department: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profile_image") {
      setFormData({
        ...formData,
        profile_image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("degree", formData.degree);
    data.append("department", formData.department);

    if (formData.profile_image) {
      data.append("profile_image", formData.profile_image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
    <div className="theme-page" style={pageStyle}>
      <div className="glass-card" style={cardStyle}>
        <h1>Create Account</h1>

        <p style={{ color: "#6b7280" }}>Register to access the portal</p>

        <form onSubmit={handleRegister}>
          <input
            className="input-box"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />

          <input
            className="input-box"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            className="input-box"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <select className="input-box" name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <select
            className="input-box"
            name="degree"
            onChange={handleChange}
            required
          >
            <option value="">Select Degree</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>

          <select
            className="input-box"
            name="department"
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
          </select>

          <input
            className="input-box"
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleChange}
          />

          <button className="primary-btn" style={{ width: "100%" }}>
            Register
          </button>
        </form>

        <p>
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: "460px",
  padding: "35px",
  textAlign: "center",
};

export default Register;