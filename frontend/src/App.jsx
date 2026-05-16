import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherResources from "./pages/teacher/TeacherResources";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherChat from "./pages/teacher/TeacherChat";

import StudentDashboard from "./pages/StudentDashboard";
import StudentHome from "./pages/student/StudentHome";
import StudentProfile from "./pages/student/StudentProfile";
import StudentClassroom from "./pages/student/StudentClassroom";
import ClassroomDetails from "./pages/student/ClassroomDetails";
import CourseRegistration from "./pages/student/CourseRegistration";
import Examinations from "./pages/student/Examinations";
import StudentMessages from "./pages/student/StudentMessages";
import StudentResources from "./pages/student/StudentResources";
import HelpCenter from "./pages/student/HelpCenter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<ManageStudents />} />

        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/resources" element={<TeacherResources />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/chat" element={<TeacherChat />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/classroom" element={<StudentClassroom />} />
        <Route path="/student/classroom/:subjectId" element={<ClassroomDetails />} />
        <Route path="/student/course-registration" element={<CourseRegistration />} />
        <Route path="/student/examinations" element={<Examinations />} />
        <Route path="/student/messages" element={<StudentMessages />} />
        <Route path="/student/resources" element={<StudentResources />} />
        <Route path="/student/help-center" element={<HelpCenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;