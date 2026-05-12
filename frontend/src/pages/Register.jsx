import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
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
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Register Page</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br /><br />

        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;