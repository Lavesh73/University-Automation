import StudentPageLayout from "./StudentPageLayout";

function HelpCenter() {
  return (
    <StudentPageLayout
      title="Campus Help Center"
      subtitle="Raise complaints, ask queries and track support requests."
    >
      <form className="glass-card" style={formStyle}>
        <input className="input-box" placeholder="Enter Subject" />

        <select className="input-box">
          <option>Fee Related</option>
          <option>Attendance Related</option>
          <option>Exam Related</option>
          <option>Hostel Related</option>
          <option>Technical Issue</option>
        </select>

        <textarea
          className="input-box"
          placeholder="Describe your issue"
          rows="5"
        ></textarea>

        <button className="primary-btn">Submit Ticket</button>
      </form>
    </StudentPageLayout>
  );
}

const formStyle = {
  padding: "24px",
  maxWidth: "650px",
};

export default HelpCenter;