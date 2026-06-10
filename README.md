# Blockchain Attendance System

## Overview

The Blockchain Attendance System is a decentralized attendance management solution built using Ethereum smart contracts and a React frontend. The system ensures secure, transparent, and tamper-proof attendance records by storing attendance data on the blockchain.

This project eliminates the possibility of unauthorized modification of attendance records and provides a reliable mechanism for managing students, classes, and attendance tracking.

---

## Features

- Role-based access control
- Student attendance management
- Class creation and management
- Secure attendance storage on blockchain
- Transparent and immutable records
- Smart contract-based authorization
- Decentralized data integrity
- User-friendly web interface

---

## Technology Stack

### Blockchain
- Solidity
- Ethereum
- Hardhat

### Frontend
- React.js
- Ethers.js

### Development Tools
- Node.js
- npm
- Hardhat Ignition

---

## Smart Contracts

### Roles.sol
Manages user roles and permissions within the system.

### Classes.sol
Handles class creation and class-related information.

### AttendanceLogic.sol
Contains the core attendance management logic.

### AttendanceSystem.sol
Acts as the main contract integrating all attendance functionalities.

---

## Running the Project

### Start Hardhat Node

```bash
npx hardhat node
```

### Deploy Smart Contracts

```bash
npx hardhat ignition deploy ./ignition/modules/AttendanceSystem.js --network localhost
```

### Start Frontend

```bash
cd frontend
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## Security Benefits

- Immutable attendance records
- Transparent verification
- Decentralized storage
- Reduced risk of data tampering
- Role-based authorization

---

## Future Enhancements

- QR code-based attendance
- Biometric integration
- Multi-institution support
- Attendance analytics dashboard
- Mobile application support
- IPFS integration for decentralized storage

