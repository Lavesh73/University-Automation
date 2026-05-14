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

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/students/add",
        formData
      );

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
      console.log(error);

      alert("Error adding student");
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      alert("Student Deleted");

      fetchStudents();
    } catch (error) {
      console.log(error);

      alert("Error deleting student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", width: "100%" }}>
          <h1>Manage Students</h1>

          {/* ADD STUDENT FORM */}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "10px",
              maxWidth: "400px",
              marginBottom: "30px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="roll_no"
              placeholder="Enter Roll Number"
              value={formData.roll_no}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="semester"
              placeholder="Enter Semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <button type="submit">
              Add Student
            </button>
          </form>

          {/* STUDENT TABLE */}

          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
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
                      onClick={() =>
                        deleteStudent(student.id)
                      }
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
  );
}

export default ManageStudents;