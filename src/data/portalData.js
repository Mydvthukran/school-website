export const studentData = {
  name: "Arjun Sharma",
  grade: "10th Grade",
  section: "A",
  rollNo: "10A-45",
  attendance: "94%",
  overallGrade: "A-",
  recentGrades: [
    { subject: "Mathematics", score: "92/100", date: "2026-06-25", type: "Mid-Term" },
    { subject: "Science", score: "88/100", date: "2026-06-28", type: "Unit Test" },
    { subject: "English", score: "95/100", date: "2026-07-02", type: "Assignment" },
  ],
  timetable: {
    Monday: ["Math", "Physics", "English", "Break", "Chemistry", "PE"],
    Tuesday: ["Biology", "Math", "History", "Break", "Computer", "Library"],
    Wednesday: ["Physics", "Chemistry", "Math", "Break", "English", "Art"],
    Thursday: ["History", "Biology", "Computer", "Break", "Math", "PE"],
    Friday: ["English", "History", "Physics", "Break", "Chemistry", "Club"]
  },
  announcements: [
    { id: 1, title: "Science Fair Registration", date: "2026-07-10", urgent: true },
    { id: 2, title: "Parent-Teacher Meeting", date: "2026-07-15", urgent: false },
    { id: 3, title: "Fee Submission Deadline", date: "2026-07-20", urgent: true }
  ]
};
