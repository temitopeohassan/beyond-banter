"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { BrowserProvider } from "ethers"
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react"
import { initializeFarcasterSDK, getFarcasterContext, type FarcasterContext } from "./farcaster-sdk"
import { getBalance } from "./contract-utils"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string
  isConnecting: boolean
  provider: BrowserProvider | null
  farcasterContext: FarcasterContext
  updateBalance: () => Promise<void>
  sendTransaction: (to: string, amount: string, data?: string) => Promise<any>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected, status } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider("eip155")
  const [balance, setBalance] = useState("0")
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [farcasterContext, setFarcasterContext] = useState<FarcasterContext>({ isSDKLoaded: false })
  const isConnecting = status === "connecting"

  // Initialize Farcaster SDK on mount
  useEffect(() => {
    const initFarcaster = async () => {
      const context = await initializeFarcasterSDK()
      setFarcasterContext(context)
    }
    initFarcaster()
  }, [])

  // Update provider when wallet provider changes
  useEffect(() => {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider as any)
      setProvider(ethersProvider)
    } else {
      setProvider(null)
    }
  }, [walletProvider])

  // Update balance when address or provider changes
  const updateBalance = useCallback(async () => {
    if (address && provider) {
      try {
        const bal = await getBalance(provider, address)
        setBalance(bal)
      } catch (error) {
        console.error("Failed to fetch balance:", error)
        setBalance("0")
      }
    } else {
      setBalance("0")
    }
  }, [address, provider])

  useEffect(() => {
    updateBalance()
  }, [updateBalance])

  // Send transaction helper
  const sendTransaction = useCallback(
    async (to: string, amount: string, data?: string) => {
      if (!provider) {
        throw new Error("No provider available")
      }

      const signer = await provider.getSigner()
      const tx = await signer.sendTransaction({
        to,
        value: amount,
        data: data || "0x",
      })

      return tx
    },
    [provider],
  )

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address: address || null,
        balance,
        isConnecting,
        provider,
        farcasterContext,
        updateBalance,
        sendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
