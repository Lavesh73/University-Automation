import { useEffect, useState } from "react";
import axios from "axios";
import StudentPageLayout from "./StudentPageLayout";

function StudentResources() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const res = await axios.get("http://localhost:5000/api/materials");
    setMaterials(res.data);
  };

  return (
    <StudentPageLayout
      title="Study Resources"
      subtitle="Download notes and files uploaded by teachers."
    >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>File Name</th>
            <th>Uploaded On</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {materials.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.subject}</td>
              <td>{item.file_name}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>
                <a
                  className="primary-btn"
                  href={`http://localhost:5000/api/materials/download/${item.file_path}`}
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StudentPageLayout>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.65)",
};

export default StudentResources;