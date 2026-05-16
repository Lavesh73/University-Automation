import StudentPageLayout from "./StudentPageLayout";

function Examinations() {
  return (
    <StudentPageLayout
      title="Examinations"
      subtitle="View examination forms, timetable, admit card and results."
    >
      <div style={gridStyle}>
        <ExamCard title="Exam Form" desc="Fill your semester examination form." />
        <ExamCard title="Admit Card" desc="Download your admit card." />
        <ExamCard title="Result" desc="View semester result." />
        <ExamCard title="Exam Timetable" desc="Check subject-wise exam dates." />
      </div>
    </StudentPageLayout>
  );
}

function ExamCard({ title, desc }) {
  return (
    <div className="glass-card" style={cardStyle}>
      <h2>{title}</h2>
      <p>{desc}</p>
      <button className="primary-btn">Open</button>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "18px",
};

const cardStyle = {
  padding: "24px",
};

export default Examinations;