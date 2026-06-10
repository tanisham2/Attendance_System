// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Roles {
    address public admin;

    mapping(address => bool) public isStudent;
    mapping(address => bool) public isTeacher;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyStudent() {
        require(isStudent[msg.sender], "Only student");
        _;
    }

    modifier onlyTeacher() {
        require(isTeacher[msg.sender], "Only teacher");
        _;
    }

    function addStudent(address student) external onlyAdmin {
        isStudent[student] = true;
    }

    function addTeacher(address teacher) external onlyAdmin {
        isTeacher[teacher] = true;
    }
}
