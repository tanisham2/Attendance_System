// Contract Configuration
export const CONTRACT_ADDRESS = "0xYourContractAddressHere";

export const CONTRACT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "classId", type: "uint256" }, { internalType: "uint256", name: "subjectId", type: "uint256" }],
    name: "markAttendance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }, { internalType: "uint256", name: "classId", type: "uint256" }],
    name: "getAttendance",
    outputs: [{ internalType: "bool[]", name: "", type: "bool[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }, { internalType: "uint256", name: "recordId", type: "uint256" }],
    name: "verifyAttendance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const SUBJECTS = [
  { id: 1, name: "Data Structures & Algorithms", code: "CS301" },
  { id: 2, name: "Machine Learning", code: "CS401" },
  { id: 3, name: "Computer Networks", code: "CS302" },
  { id: 4, name: "Database Management Systems", code: "CS303" },
  { id: 5, name: "Operating Systems", code: "CS304" },
  { id: 6, name: "Deep Learning", code: "CS501" },
];

export const CLASSES = [
  { id: 1, name: "CSE-A (3rd Year)" },
  { id: 2, name: "CSE-B (3rd Year)" },
  { id: 3, name: "CSE-C (3rd Year)" },
  { id: 4, name: "CSE-AI/ML (3rd Year)" },
];

export const MOCK_STUDENTS = [
  { address: "0x1a2b...3c4d", name: "Aarav Singh", rollNo: "220101001", attendance: 92 },
  { address: "0x5e6f...7a8b", name: "Priya Mehta", rollNo: "220101002", attendance: 87 },
  { address: "0x9c0d...1e2f", name: "Rohan Sharma", rollNo: "220101003", attendance: 74 },
  { address: "0x3a4b...5c6d", name: "Ananya Patel", rollNo: "220101004", attendance: 95 },
  { address: "0x7e8f...9a0b", name: "Vikram Nair", rollNo: "220101005", attendance: 68 },
  { address: "0xb1c2...d3e4", name: "Sneha Reddy", rollNo: "220101006", attendance: 81 },
];

export const MOCK_ATTENDANCE_RECORDS = [
  { date: "2026-04-10", subject: "Machine Learning", class: "CSE-AI/ML", status: "present", txHash: "0xabc...123", verified: true },
  { date: "2026-04-09", subject: "Deep Learning", class: "CSE-AI/ML", status: "present", txHash: "0xdef...456", verified: true },
  { date: "2026-04-08", subject: "Data Structures & Algorithms", class: "CSE-AI/ML", status: "absent", txHash: null, verified: false },
  { date: "2026-04-07", subject: "Computer Networks", class: "CSE-AI/ML", status: "present", txHash: "0xghi...789", verified: true },
  { date: "2026-04-04", subject: "Operating Systems", class: "CSE-AI/ML", status: "present", txHash: "0xjkl...012", verified: false },
  { date: "2026-04-03", subject: "Database Management Systems", class: "CSE-AI/ML", status: "present", txHash: "0xmno...345", verified: true },
];

export const MOCK_STATS = {
  totalStudents: 248,
  totalSubjects: 6,
  totalClasses: 4,
  attendanceToday: 187,
  pendingVerifications: 14,
  overallAttendance: 83,
};