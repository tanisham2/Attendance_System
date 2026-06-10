import React from "react";
import Sidebar from "./Sidebar";
import WalletConnect from "./WalletConnect";

const DashboardLayout = ({ role, children, title, wallet, connect }) => {
  return (
    <div className="flex min-h-screen bg-chain-bg">
      <Sidebar role={role} wallet={wallet} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-chain-border bg-chain-surface/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-bold text-lg text-white">{title}</h1>

          <button
            onClick={connect}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {wallet?.connected ? "Connected" : "Connect Wallet"}
          </button>
        </header>

        {/* Main */}
        <main className="flex-1 p-8">
          {React.cloneElement(children, { wallet, connect })}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;