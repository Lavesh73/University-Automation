import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (err) {
      alert("Login Failed");
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
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "35px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          University Automation
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Login to continue
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

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
            }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          New user?{" "}
          <Link to="/register" style={{ color: "#ef4d4d" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;