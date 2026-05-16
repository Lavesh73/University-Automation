import { useNavigate } from "react-router-dom";
import StudentPageLayout from "./StudentPageLayout";

function StudentClassroom() {
  const navigate = useNavigate();

  const subjects = [
    {
      id: "web-development",
      title: "Web Development",
      teacher: "Mr. Sharma",
      attended: 36,
      total: 42,
    },
    {
      id: "dbms",
      title: "Database Management System",
      teacher: "Ms. Verma",
      attended: 32,
      total: 40,
    },
    {
      id: "computer-networks",
      title: "Computer Networks",
      teacher: "Mr. Khan",
      attended: 30,
      total: 38,
    },
    {
      id: "software-engineering",
      title: "Software Engineering",
      teacher: "Dr. Mehta",
      attended: 34,
      total: 39,
    },
  ];

  const totalAttended = subjects.reduce(
    (sum, subject) => sum + subject.attended,
    0
  );

  const totalClasses = subjects.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const overallAttendance = Math.round(
    (totalAttended / totalClasses) * 100
  );

  return (
    <StudentPageLayout
      title="Classroom"
      subtitle="Access subjects, attendance, resources, chat and assignments."
    >
      <div className="glass-card" style={overallCard}>
        <div>
          <h2>Overall Attendance</h2>
          <p style={{ color: "#6b7280" }}>
            Total attendance across all registered subjects.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#7c4dff", fontSize: "48px" }}>
            {overallAttendance}%
          </h1>

          <p>
            <b>{totalAttended}</b> classes attended out of{" "}
            <b>{totalClasses}</b>
          </p>
        </div>
      </div>

      <div style={gridStyle}>
        {subjects.map((subject) => {
          const percentage = Math.round(
            (subject.attended / subject.total) * 100
          );

          return (
            <div
              className="glass-card"
              style={cardStyle}
              key={subject.id}
            >
              <h2>{subject.title}</h2>
              <p>
                <b>Teacher:</b> {subject.teacher}
              </p>

              <div style={attendanceBox}>
                <h3>{percentage}%</h3>
                <p>Total Attendance</p>
                <p>
                  <b>{subject.attended}</b> classes attended out of{" "}
                  <b>{subject.total}</b>
                </p>
              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate(`/student/classroom/${subject.id}`)
                }
              >
                Open Classroom
              </button>
            </div>
          );
        })}
      </div>
    </StudentPageLayout>
  );
}

const overallCard = {
  padding: "28px",
  marginBottom: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "18px",
};

const cardStyle = {
  padding: "24px",
};

const attendanceBox = {
  background: "rgba(255,255,255,0.7)",
  padding: "15px",
  borderRadius: "18px",
  margin: "15px 0",
};

export default StudentClassroom;