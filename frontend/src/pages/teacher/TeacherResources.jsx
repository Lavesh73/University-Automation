import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function TeacherResources() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    file: null,
  });

  const fetchMaterials = async () => {
    const res = await axios.get("http://localhost:5000/api/materials");
    setMaterials(res.data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("uploaded_by", user?.id || 1);
    data.append("file", formData.file);

    try {
      await axios.post("http://localhost:5000/api/materials/upload", data);
      alert("File uploaded successfully");

      setFormData({
        title: "",
        subject: "",
        file: null,
      });

      fetchMaterials();
    } catch (error) {
      alert("Upload failed");
      console.log(error);
    }
  };

  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>Upload Study Resources</h1>
            <p style={{ color: "#6b7280" }}>
              Upload notes, PDFs, assignments and study files for students.
            </p>

            <form onSubmit={handleUpload} style={formStyle}>
              <input
                className="input-box"
                placeholder="Resource Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <input
                className="input-box"
                placeholder="Subject Name"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />

              <input
                className="input-box"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                required
              />

              <button className="primary-btn">Upload File</button>
            </form>

            <h2>Uploaded Materials</h2>

            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>File</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {materials.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.subject}</td>
                    <td>{item.file_name}</td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
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
  gridTemplateColumns: "1fr 1fr 1fr auto",
  gap: "12px",
  marginTop: "25px",
  marginBottom: "30px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.65)",
};

export default TeacherResources;