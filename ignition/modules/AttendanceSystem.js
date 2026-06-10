const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AttendanceSystemModule", (m) => {
  const attendanceSystem = m.contract("AttendanceSystem");
  return { attendanceSystem };
});
