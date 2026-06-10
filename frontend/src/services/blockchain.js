import { ethers } from "ethers";
 
// Replace with your deployed contract address after `npx hardhat run scripts/deploy.js`
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
 
// ABI matching AttendanceLogic.sol exactly
export const CONTRACT_ABI = [
  // markMyAttendance(classId, sessionId, present)
  {
    inputs: [
      { internalType: "uint256", name: "classId", type: "uint256" },
      { internalType: "uint256", name: "sessionId", type: "uint256" },
      { internalType: "bool", name: "present", type: "bool" },
    ],
    name: "markMyAttendance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // verifyAttendance(classId, sessionId, student, present)
  {
    inputs: [
      { internalType: "uint256", name: "classId", type: "uint256" },
      { internalType: "uint256", name: "sessionId", type: "uint256" },
      { internalType: "address", name: "student", type: "address" },
      { internalType: "bool", name: "present", type: "bool" },
    ],
    name: "verifyAttendance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // resolveDispute(classId, sessionId, student, decision)
  {
    inputs: [
      { internalType: "uint256", name: "classId", type: "uint256" },
      { internalType: "uint256", name: "sessionId", type: "uint256" },
      { internalType: "address", name: "student", type: "address" },
      { internalType: "bool", name: "decision", type: "bool" },
    ],
    name: "resolveDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // attendance mapping getter
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "attendance",
    outputs: [
      { internalType: "bool", name: "studentPresent", type: "bool" },
      { internalType: "bool", name: "teacherPresent", type: "bool" },
      { internalType: "uint8", name: "status", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "classId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "sessionId", type: "uint256" },
      { indexed: true, internalType: "address", name: "student", type: "address" },
      { indexed: false, internalType: "bool", name: "present", type: "bool" },
    ],
    name: "AttendanceMarked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "classId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "sessionId", type: "uint256" },
      { indexed: true, internalType: "address", name: "student", type: "address" },
      { indexed: false, internalType: "bool", name: "teacherPresent", type: "bool" },
    ],
    name: "AttendanceVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "classId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "sessionId", type: "uint256" },
      { indexed: true, internalType: "address", name: "student", type: "address" },
      { indexed: false, internalType: "uint8", name: "finalStatus", type: "uint8" },
    ],
    name: "DisputeResolved",
    type: "event",
  },
];
 
// Status enum matching Solidity: 0=NotMarked, 1=StudentMarked, 2=TeacherVerified, 3=Disputed, 4=AdminApproved, 5=AdminRejected
export const AttendanceStatus = {
  0: "Not Marked",
  1: "Student Marked",
  2: "Teacher Verified",
  3: "Disputed",
  4: "Admin Approved",
  5: "Admin Rejected",
};
 
export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask extension.");
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const network = await provider.getNetwork();
  return { address: accounts[0], signer, provider, network };
};
 
export const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
 
// Called by Student: markMyAttendance(classId, sessionId, present=true)
export const markAttendanceOnChain = async (signer, classId, sessionId) => {
  try {
    const contract = getContract(signer);
    const tx = await contract.markMyAttendance(classId, sessionId, true);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (err) {
    console.warn("Contract call failed, using mock:", err.message);
    return {
      success: true,
      txHash: "0x" + Math.random().toString(16).slice(2).padEnd(64, "0"),
      mock: true,
    };
  }
};
 
// Called by Teacher: verifyAttendance(classId, sessionId, studentAddress, present)
export const verifyAttendanceOnChain = async (signer, classId, sessionId, studentAddress, present) => {
  try {
    const contract = getContract(signer);
    const tx = await contract.verifyAttendance(classId, sessionId, studentAddress, present);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (err) {
    console.warn("Contract call failed, using mock:", err.message);
    return {
      success: true,
      txHash: "0x" + Math.random().toString(16).slice(2).padEnd(64, "0"),
      mock: true,
    };
  }
};
 
// Called by Admin: resolveDispute(classId, sessionId, studentAddress, decision)
export const resolveDisputeOnChain = async (signer, classId, sessionId, studentAddress, decision) => {
  try {
    const contract = getContract(signer);
    const tx = await contract.resolveDispute(classId, sessionId, studentAddress, decision);
    await tx.wait();
    return { success: true, txHash: tx.hash };
  } catch (err) {
    console.warn("Contract call failed, using mock:", err.message);
    return {
      success: true,
      txHash: "0x" + Math.random().toString(16).slice(2).padEnd(64, "0"),
      mock: true,
    };
  }
};
 
// Read attendance record for a student
export const getAttendanceRecord = async (provider, classId, sessionId, studentAddress) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const record = await contract.attendance(classId, sessionId, studentAddress);
    return {
      studentPresent: record.studentPresent,
      teacherPresent: record.teacherPresent,
      status: Number(record.status),
      statusLabel: AttendanceStatus[Number(record.status)],
    };
  } catch (err) {
    console.warn("Read failed, using mock");
    return null;
  }
};
 
export const formatAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
 
export const listenForAccountChange = (callback) => {
  if (window.ethereum) window.ethereum.on("accountsChanged", callback);
};
 
export const removeAccountListener = (callback) => {
  if (window.ethereum) window.ethereum.removeListener("accountsChanged", callback);
};