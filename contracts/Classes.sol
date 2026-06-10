// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Roles.sol";

contract Classes is Roles {
    struct Class {
        uint256 id;
        address teacher;
        bool active;
    }

    uint256 public classCount;
    mapping(uint256 => Class) public classes;

    function createClass() external onlyTeacher {
        classCount++;
        classes[classCount] = Class(classCount, msg.sender, true);
    }
}
