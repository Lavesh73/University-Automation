import StudentPageLayout from "./StudentPageLayout";

function CourseRegistration() {
  return (
    <StudentPageLayout
      title="Course Registration"
      subtitle="Register for semester subjects and elective courses."
    >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>CS601</td>
            <td>Web Development</td>
            <td>4</td>
            <td>Registered</td>
          </tr>
          <tr>
            <td>CS602</td>
            <td>Computer Networks</td>
            <td>4</td>
            <td>Registered</td>
          </tr>
          <tr>
            <td>CS603</td>
            <td>Software Engineering</td>
            <td>3</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </StudentPageLayout>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.65)",
  borderRadius: "18px",
  overflow: "hidden",
};

export default CourseRegistration;  