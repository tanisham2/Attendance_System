// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Classes.sol";

contract AttendanceLogic is Classes {

    enum Status {
        NotMarked,
        StudentMarked,
        TeacherVerified,
        Disputed,
        AdminApproved,
        AdminRejected
    }

    struct Attendance {
        bool studentPresent;
        bool teacherPresent;
        Status status;
    }

    event AttendanceMarked(
    uint256 indexed classId,
    uint256 indexed sessionId,
    address indexed student,
    bool present
);

event AttendanceVerified(
    uint256 indexed classId,
    uint256 indexed sessionId,
    address indexed student,
    bool teacherPresent
);

event DisputeResolved(
    uint256 indexed classId,
    uint256 indexed sessionId,
    address indexed student,
    Status finalStatus
);


    mapping(uint256 => mapping(uint256 => mapping(address => Attendance)))
        public attendance;

    function markMyAttendance(
        uint256 classId,
        uint256 sessionId,
        bool present
    ) external onlyStudent {
        Attendance storage a =
            attendance[classId][sessionId][msg.sender];

        require(a.status == Status.NotMarked, "Already marked");

        a.studentPresent = present;
        a.status = Status.StudentMarked;
        emit AttendanceMarked(classId, sessionId, msg.sender, present);

    }

    function verifyAttendance(
        uint256 classId,
        uint256 sessionId,
        address student,
        bool present
    ) external onlyTeacher {
        Attendance storage a =
            attendance[classId][sessionId][student];

        require(a.status == Status.StudentMarked, "Not marked yet");

        a.teacherPresent = present;

        if (present == a.studentPresent) {
            a.status = Status.TeacherVerified;
        } else {
            a.status = Status.Disputed;
        }
        emit AttendanceVerified(classId, sessionId, student, present);
    }

    function resolveDispute(
        uint256 classId,
        uint256 sessionId,
        address student,
        bool decision
    ) external onlyAdmin {
        Attendance storage a =
            attendance[classId][sessionId][student];

        require(a.status == Status.Disputed, "No dispute");

        if (decision == true) {
            a.status = Status.AdminApproved;
        } 
        else {
            a.status =Status.AdminRejected;
        }
        emit DisputeResolved(classId, sessionId, student, a.status);
    }
}
