import { useState, useEffect, useCallback } from "react";
import { connectWallet, formatAddress, listenForAccountChange, removeAccountListener } from "../services/blockchain";

export const useWallet = () => {
  const [wallet, setWallet] = useState({
    address: null,
    signer: null,
    provider: null,
    network: null,
    connected: false,
    connecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setWallet((w) => ({ ...w, connecting: true, error: null }));
    try {
      const { address, signer, provider, network } = await connectWallet();
      setWallet({ address, signer, provider, network, connected: true, connecting: false, error: null });
    } catch (err) {
      setWallet((w) => ({ ...w, connecting: false, error: err.message }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ address: null, signer: null, provider: null, network: null, connected: false, connecting: false, error: null });
  }, []);

  useEffect(() => {
    const handleAccountChange = (accounts) => {
      if (accounts.length === 0) disconnect();
      else setWallet((w) => ({ ...w, address: accounts[0] }));
    };
    listenForAccountChange(handleAccountChange);
    return () => removeAccountListener(handleAccountChange);
  }, [disconnect]);

  return { wallet, connect, disconnect, shortAddress: formatAddress(wallet.address) };
};