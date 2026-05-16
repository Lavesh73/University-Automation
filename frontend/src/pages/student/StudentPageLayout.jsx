import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function StudentPageLayout({ title, subtitle, children }) {
  return (
    <div className="theme-page">
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
          <div className="glass-card" style={{ padding: "30px" }}>
            <h1>{title}</h1>
            <p style={{ color: "#6b7280" }}>{subtitle}</p>

            <div style={{ marginTop: "25px" }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPageLayout;