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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "35px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Register to access the portal
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Degree</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MBA">MBA</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Department</option>
            <option value="Computer Science">
              Computer Science
            </option>

            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>

            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>

            <option value="Civil Engineering">
              Civil Engineering
            </option>

            <option value="Electrical Engineering">
              Electrical Engineering
            </option>

            <option value="Electronics Engineering">
              Electronics Engineering
            </option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#ef4d4d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#ef4d4d",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default Register;