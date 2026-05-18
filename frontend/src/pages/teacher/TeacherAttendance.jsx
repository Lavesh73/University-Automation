import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function TeacherAttendance() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sessionId, setSessionId] = useState("");
    const [message, setMessage] = useState("");
    const [attendanceDone, setAttendanceDone] = useState(false);
    const [summary, setSummary] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [sessionData, setSessionData] = useState({
        subject: "",
        class_name: "",
        session_start: "",
    });

    useEffect(() => {
        fetchPreviousSessions();
    }, []);

    const fetchPreviousSessions = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/attendance/sessions"
            );

            setSessions(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStudentsAfterSession = async (id) => {
        const res = await axios.get(
            `http://localhost:5000/api/attendance/records/${id}`
        );

        const updatedStudents = res.data.map((student) => ({
            ...student,
            attendanceStatus: student.status || "Not Marked",
        }));

        setStudents(updatedStudents);
    };

    const createSession = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/attendance/session",
                {
                    subject: sessionData.subject,
                    class_name: sessionData.class_name,
                    teacher_id: user?.id || 1,
                    session_start: sessionData.session_start,
                }
            );

            setSessionId(res.data.session_id);
            setAttendanceDone(false);
            setSummary(null);
            setEditMode(true);
            setMessage("Attendance session created. Now mark attendance.");

            fetchStudentsAfterSession(res.data.session_id);
            fetchPreviousSessions();
        } catch (error) {
            setMessage("Session creation failed.");
            console.log(error);
        }
    };

    const markAttendance = async (studentId, status) => {
        if (!sessionId) {
            setMessage("Please create or open an attendance session first.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/attendance/mark", {
                session_id: sessionId,
                student_id: studentId,
                status,
            });

            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === studentId
                        ? {
                            ...student,
                            attendanceStatus: status,
                        }
                        : student
                )
            );

            setMessage("");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Attendance update failed."
            );
            console.log(error);
        }
    };

    const handleDone = async () => {
        const notMarked = students.filter(
            (student) => student.attendanceStatus === "Not Marked"
        );

        if (notMarked.length > 0) {
            setMessage("Please mark attendance of all students before clicking Done.");
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:5000/api/attendance/summary/${sessionId}`
            );

            setSummary(res.data);
            setAttendanceDone(true);
            setEditMode(false);
            setMessage("Attendance completed successfully.");
            fetchPreviousSessions();
        } catch (error) {
            setMessage("Unable to generate attendance summary.");
            console.log(error);
        }
    };

    const openPreviousSession = async (session) => {
        setSessionId(session.id);
        setSummary(session);
        setAttendanceDone(true);
        setEditMode(false);

        setSessionData({
            subject: session.subject,
            class_name: session.class_name,
            session_start: session.session_start,
        });

        await fetchStudentsAfterSession(session.id);

        setMessage("Previous attendance record opened.");
    };

    const handleEdit = async () => {
        if (!summary) return;

        if (summary.hours_passed > 12) {
            setMessage(
                "Edit time expired. Attendance can be edited only within 12 hours."
            );
            return;
        }

        await fetchStudentsAfterSession(summary.id);

        setEditMode(true);
        setAttendanceDone(false);
        setMessage("Edit mode enabled. You can update attendance now.");
    };

    const totalStudents = students.length;

    const presentCount = students.filter(
        (student) => student.attendanceStatus === "Present"
    ).length;

    const absentCount = students.filter(
        (student) => student.attendanceStatus === "Absent"
    ).length;

    const notMarkedCount = students.filter(
        (student) => student.attendanceStatus === "Not Marked"
    ).length;

    const attendancePercentage =
        totalStudents === 0
            ? 0
            : Math.round((presentCount / totalStudents) * 100);

    return (
        <div className="theme-page">
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "0 18px 18px 0" }}>
                    <div className="glass-card" style={{ padding: "30px" }}>
                        <h1>Teacher Attendance Panel</h1>

                        <p style={{ color: "#6b7280" }}>
                            Create attendance session, mark students, complete attendance,
                            and edit within 12 hours.
                        </p>

                        <form onSubmit={createSession} style={formStyle}>
                            <input
                                className="input-box"
                                placeholder="Subject"
                                value={sessionData.subject}
                                onChange={(e) =>
                                    setSessionData({
                                        ...sessionData,
                                        subject: e.target.value,
                                    })
                                }
                                required
                            />

                            <input
                                className="input-box"
                                placeholder="Class Name"
                                value={sessionData.class_name}
                                onChange={(e) =>
                                    setSessionData({
                                        ...sessionData,
                                        class_name: e.target.value,
                                    })
                                }
                                required
                            />

                            <input
                                className="input-box"
                                type="datetime-local"
                                value={sessionData.session_start}
                                onChange={(e) =>
                                    setSessionData({
                                        ...sessionData,
                                        session_start: e.target.value,
                                    })
                                }
                                required
                            />

                            <button className="primary-btn">Create Session</button>
                        </form>

                        {message && (
                            <div className="glass-card" style={messageBox}>
                                {message}
                            </div>
                        )}

                        {!sessionId && (
                            <div className="glass-card" style={messageBox}>
                                Please create an attendance session first. Student list will
                                appear after session creation.
                            </div>
                        )}

                        {sessionId && (
                            <>
                                <div className="glass-card" style={sessionBox}>
                                    Active Session ID: <b>{sessionId}</b> | Subject:{" "}
                                    <b>{sessionData.subject}</b> | Class:{" "}
                                    <b>{sessionData.class_name}</b>
                                </div>

                                <div style={statsGrid}>
                                    <StatusCard title="Total Students" value={totalStudents} />
                                    <StatusCard
                                        title="Present"
                                        value={presentCount}
                                        color="green"
                                    />
                                    <StatusCard
                                        title="Absent"
                                        value={absentCount}
                                        color="red"
                                    />
                                    <StatusCard
                                        title="Not Marked"
                                        value={notMarkedCount}
                                        color="#7c4dff"
                                    />
                                </div>
                            </>
                        )}

                        {sessionId && editMode && (
                            <>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Student Name</th>
                                            <th>Roll No</th>
                                            <th>Department</th>
                                            <th>Semester</th>
                                            <th>Current Status</th>
                                            <th>Attendance Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id}>
                                                <td>{student.id}</td>
                                                <td>{student.name}</td>
                                                <td>{student.roll_no}</td>
                                                <td>{student.department}</td>
                                                <td>{student.semester}</td>

                                                <td>
                                                    <span
                                                        style={{
                                                            ...statusBadge,
                                                            background:
                                                                student.attendanceStatus === "Present"
                                                                    ? "rgba(0, 180, 90, 0.15)"
                                                                    : student.attendanceStatus === "Absent"
                                                                        ? "rgba(255, 0, 0, 0.12)"
                                                                        : "rgba(124, 77, 255, 0.12)",
                                                            color:
                                                                student.attendanceStatus === "Present"
                                                                    ? "green"
                                                                    : student.attendanceStatus === "Absent"
                                                                        ? "red"
                                                                        : "#7c4dff",
                                                        }}
                                                    >
                                                        {student.attendanceStatus}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        style={{
                                                            ...actionButton,
                                                            background:
                                                                student.attendanceStatus === "Present"
                                                                    ? "green"
                                                                    : "linear-gradient(135deg, #7c4dff, #5b8cff)",
                                                        }}
                                                        onClick={() =>
                                                            markAttendance(student.id, "Present")
                                                        }
                                                    >
                                                        Present
                                                    </button>

                                                    <button
                                                        style={{
                                                            ...actionButton,
                                                            background:
                                                                student.attendanceStatus === "Absent"
                                                                    ? "red"
                                                                    : "rgba(255,255,255,0.75)",
                                                            color:
                                                                student.attendanceStatus === "Absent"
                                                                    ? "white"
                                                                    : "#374151",
                                                            border:
                                                                student.attendanceStatus === "Absent"
                                                                    ? "none"
                                                                    : "1px solid rgba(124,77,255,0.18)",
                                                        }}
                                                        onClick={() =>
                                                            markAttendance(student.id, "Absent")
                                                        }
                                                    >
                                                        Absent
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div style={{ marginTop: "20px", textAlign: "right" }}>
                                    <button className="primary-btn" onClick={handleDone}>
                                        Done Attendance
                                    </button>
                                </div>
                            </>
                        )}

                        {attendanceDone && summary && (
                            <div className="glass-card" style={summaryBox}>
                                <h3 style={{ marginBottom: "10px" }}>
                                    Today's Attendance Summary
                                </h3>

                                <div style={summaryMeta}>
                                    <span>
                                        <b>Subject:</b> {summary.subject}
                                    </span>

                                    <span>
                                        <b>Class:</b> {summary.class_name}
                                    </span>

                                    <span>
                                        <b>Session:</b>{" "}
                                        {new Date(summary.session_start).toLocaleString()}
                                    </span>
                                </div>

                                <div style={summaryStats}>
                                    <div>
                                        <h3>{totalStudents}</h3>
                                        <p>Total</p>
                                    </div>

                                    <div>
                                        <h3 style={{ color: "green" }}>{presentCount}</h3>
                                        <p>Present</p>
                                    </div>

                                    <div>
                                        <h3 style={{ color: "red" }}>{absentCount}</h3>
                                        <p>Absent</p>
                                    </div>

                                    <div>
                                        <h3 style={{ color: "#7c4dff" }}>
                                            {attendancePercentage}%
                                        </h3>
                                        <p>Class Attendance</p>
                                    </div>
                                </div>

                                <button
                                    className="secondary-btn"
                                    onClick={handleEdit}
                                    style={{
                                        padding: "10px 18px",
                                        fontSize: "14px",
                                        marginTop: "8px",
                                    }}
                                >
                                    Edit Attendance
                                </button>
                            </div>
                        )}

                        <div className="glass-card" style={previousBox}>
                            <h2>Previous Attendance Records</h2>

                            {sessions.length === 0 ? (
                                <p>No previous attendance sessions found.</p>
                            ) : (
                                <div style={previousGrid}>
                                    {sessions.map((session) => {
                                        const present = session.present_count || 0;
                                        const absent = session.absent_count || 0;
                                        const total = present + absent;
                                        const percentage =
                                            total === 0
                                                ? 0
                                                : Math.round((present / total) * 100);

                                        return (
                                            <div
                                                key={session.id}
                                                className="glass-card"
                                                style={previousCard}
                                            >
                                                <h3>{session.subject}</h3>

                                                <p>
                                                    <b>Class:</b> {session.class_name}
                                                </p>

                                                <p>
                                                    <b>Date:</b>{" "}
                                                    {new Date(session.session_start).toLocaleDateString()}
                                                </p>

                                                <p>
                                                    <b>Time:</b>{" "}
                                                    {new Date(session.session_start).toLocaleTimeString()}
                                                </p>

                                                <div style={miniStats}>
                                                    <span style={{ color: "green" }}>
                                                        Present: {present}
                                                    </span>

                                                    <span style={{ color: "red" }}>
                                                        Absent: {absent}
                                                    </span>

                                                    <span style={{ color: "#7c4dff" }}>
                                                        {percentage}%
                                                    </span>
                                                </div>

                                                <button
                                                    className="secondary-btn"
                                                    onClick={() => openPreviousSession(session)}
                                                >
                                                    Open / Edit
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <p style={{ color: "#6b7280", marginTop: "18px" }}>
                            Note: Attendance can be edited only up to 12 hours after class
                            start time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusCard({ title, value, color = "#7c4dff" }) {
    return (
        <div className="glass-card" style={statusCard}>
            <h2 style={{ color }}>{value}</h2>
            <p>{title}</p>
        </div>
    );
}

const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr auto",
    gap: "12px",
    marginTop: "25px",
    marginBottom: "25px",
};

const messageBox = {
    padding: "15px",
    marginBottom: "15px",
    color: "#374151",
};

const sessionBox = {
    padding: "16px",
    marginBottom: "18px",
};

const statsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "22px",
};

const statusCard = {
    padding: "18px",
    textAlign: "center",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "rgba(255,255,255,0.65)",
};

const statusBadge = {
    padding: "8px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    display: "inline-block",
};

const actionButton = {
    color: "white",
    border: "none",
    padding: "9px 13px",
    borderRadius: "12px",
    marginRight: "8px",
    fontWeight: "bold",
    cursor: "pointer",
};

const summaryBox = {
    padding: "18px",
    marginTop: "18px",
    borderRadius: "20px",
};

const summaryMeta = {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    marginBottom: "12px",
    fontSize: "15px",
};

const summaryStats = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    textAlign: "center",
    margin: "10px 0",
};

const previousBox = {
    padding: "22px",
    marginTop: "25px",
};

const previousGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
};

const previousCard = {
    padding: "18px",
};

const miniStats = {
    display: "flex",
    justifyContent: "space-between",
    margin: "14px 0",
    fontWeight: "bold",
};

export default TeacherAttendance;