import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ManageStudents() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roll_no: "",
    department: "",
    semester: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/students/add", formData);
      alert("Student Added Successfully");

      setFormData({
        name: "",
        email: "",
        roll_no: "",
        department: "",
        semester: "",
        phone: "",
      });

      fetchStudents();
    } catch (error) {
      alert("Error adding student");
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Manage Students</h1>

            <form onSubmit={handleSubmit} style={formStyle}>
              <input className="input-box" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
              <input className="input-box" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
              <input className="input-box" name="roll_no" placeholder="Enter Roll Number" value={formData.roll_no} onChange={handleChange} required />
              <input className="input-box" name="department" placeholder="Enter Department" value={formData.department} onChange={handleChange} required />
              <input className="input-box" name="semester" placeholder="Enter Semester" value={formData.semester} onChange={handleChange} required />
              <input className="input-box" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handleChange} />

              <button className="primary-btn">Add Student</button>
            </form>

            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll No</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.roll_no}</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
                    <td>{student.phone}</td>
                    <td>
                      <button
                        className="secondary-btn"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginBottom: "25px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.55)",
  borderRadius: "18px",
  overflow: "hidden",
};

export default ManageStudents;