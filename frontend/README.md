# Blockchain Attendance System

A secure and decentralized attendance management system built using Blockchain technology. The system stores attendance records on the blockchain, ensuring transparency, immutability, and protection against unauthorized modifications.

## Overview

Traditional attendance systems rely on centralized databases, making them vulnerable to data manipulation and unauthorized access. This project leverages blockchain technology and smart contracts to create a tamper-proof attendance tracking system where attendance records are securely stored and verified.

## Features

- Secure attendance recording on the blockchain
- Tamper-proof and immutable attendance records
- Student attendance tracking
- Faculty attendance management
- Attendance history retrieval
- Transparent and verifiable records
- Smart contract-based data storage
- Decentralized architecture
- Wallet integration using MetaMask
- Real-time attendance updates

## Tech Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Blockchain
- Solidity
- Ethereum
- MetaMask
- Web3.js / Ethers.js

### Development Tools
- Remix IDE
- Hardhat
- Ganache

## System Workflow

1. Faculty connects their wallet.
2. Faculty marks student attendance.
3. Attendance data is sent to the smart contract.
4. Smart contract validates and stores the record.
5. Attendance records become immutable on the blockchain.
6. Students and faculty can view attendance history.

## Smart Contract Functions

### Faculty Functions
- Mark Attendance
- View Attendance Records
- Verify Student Attendance

### Student Functions
- View Personal Attendance
- Check Attendance Percentage
- Access Attendance History

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to Project Directory

```bash
cd Blockchain-Attendance-System
```

### Install Dependencies

```bash
npm install
```

### Start Local Blockchain

```bash
npx hardhat node
```

### Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Start Frontend

```bash
cd frontend
npm install
npm start
```

## Advantages of Blockchain Attendance

- Data cannot be altered after recording
- Increased transparency
- Improved security
- Elimination of attendance fraud
- Reduced dependency on centralized databases
- Easy verification of attendance records

## Future Enhancements

- QR Code Based Attendance
- Biometric Authentication
- Face Recognition Integration
- Role-Based Access Control
- Attendance Analytics Dashboard
- Multi-Institution Support
- IPFS Integration for Data Storage
- Mobile Application Support

## Learning Outcomes

- Blockchain Fundamentals
- Smart Contract Development
- Ethereum Ecosystem
- Decentralized Application (DApp) Development
- Web3 Integration
- Smart Contract Deployment
