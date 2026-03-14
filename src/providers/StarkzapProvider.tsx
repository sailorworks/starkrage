"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { StarkZap, OnboardStrategy, WalletInterface } from "starkzap";

interface StarkzapContextType {
  sdk: StarkZap | null;
  wallet: WalletInterface | null;
  connect: () => Promise<void>;
  isConnecting: boolean;
  address: string | null;
}

const StarkzapContext = createContext<StarkzapContextType>({
  sdk: null,
  wallet: null,
  connect: async () => {},
  isConnecting: false,
  address: null,
});

export function StarkzapProvider({ children }: { children: ReactNode }) {
  const [sdk, setSdk] = useState<StarkZap | null>(null);
  const [wallet, setWallet] = useState<WalletInterface | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Initialize StarkZap on Sepolia testnet
    const instance = new StarkZap({ network: "sepolia" });
    setSdk(instance);
  }, []);

  const connect = async () => {
    if (!sdk) return;
    setIsConnecting(true);
    try {
      const onboard = await sdk.onboard({
        strategy: OnboardStrategy.Cartridge,
        cartridge: {
          policies: [], 
        },
      });
      setWallet(onboard.wallet);
      if ((onboard.wallet as any).account) {
          setAddress((onboard.wallet as any).account.address);
      } else {
          setAddress("0xConnectedSession...7A9B");
      }
    } catch (error: any) {
      console.error("Failed to connect via Cartridge:", error);
      
      // Fallback for strict browser settings (Firefox/Brave) blocking Cartridge iframes
      if (error?.message?.includes("Cartridge Controller failed to initialize")) {
        alert("Action Required: Your browser is blocking Cartridge.gg.\n\nPlease disable 'Strict Tracking Protection' (Firefox) or 'Shields' (Brave) for this site, as Cartridge requires third-party cookies to connect securely.\n\n[MOCK MODE ENABLED for testing]");
        setAddress("0xMockCartridge...7A9B"); // Mocking connection for the prototype
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <StarkzapContext.Provider value={{ sdk, wallet, connect, isConnecting, address }}>
      {children}
    </StarkzapContext.Provider>
  );
}

export const useStarkzap = () => useContext(StarkzapContext);
