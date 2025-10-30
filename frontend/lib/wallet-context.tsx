"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useFarcaster } from './farcaster-context'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  updateBalance: (amount: number) => void
  // Farcaster integration
  isFarcasterWallet: boolean
  farcasterUser: any | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  
  // Farcaster integration
  const farcaster = useFarcaster()
  const [isFarcasterWallet, setIsFarcasterWallet] = useState(false)
  const [farcasterUser, setFarcasterUser] = useState<any | null>(null)

  // Sync with Farcaster wallet when available
  useEffect(() => {
    if (farcaster.isWalletConnected && farcaster.walletAddress) {
      setAddress(farcaster.walletAddress)
      setIsConnected(true)
      setIsFarcasterWallet(true)
      setFarcasterUser(farcaster.user)
      
      // Convert balance from string to number if available
      if (farcaster.walletBalance) {
        const balanceValue = parseFloat(farcaster.walletBalance)
        if (!isNaN(balanceValue)) {
          setBalance(balanceValue)
        }
      }
    }
  }, [farcaster.isWalletConnected, farcaster.walletAddress, farcaster.walletBalance, farcaster.user])

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    try {
      // Try Farcaster wallet first if available
      if (farcaster.sdk && !farcaster.isWalletConnected) {
        await farcaster.connectWallet()
        // The useEffect above will handle the state updates
        return
      }
      
      // Fallback to mock wallet if Farcaster is not available
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock wallet data
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      const mockBalance = Math.floor(Math.random() * 50000) + 5000

      setAddress(mockAddress)
      setBalance(mockBalance)
      setIsConnected(true)
      setIsFarcasterWallet(false)

      // Store in localStorage for persistence
      localStorage.setItem("walletAddress", mockAddress)
      localStorage.setItem("walletBalance", mockBalance.toString())
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [farcaster])

  const disconnectWallet = useCallback(async () => {
    // Disconnect Farcaster wallet if connected
    if (isFarcasterWallet && farcaster.sdk) {
      await farcaster.disconnectWallet()
    }
    
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
    setIsFarcasterWallet(false)
    setFarcasterUser(null)
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")
  }, [isFarcasterWallet, farcaster])

  const updateBalance = useCallback(
    (amount: number) => {
      setBalance((prev) => prev + amount)
      if (address) {
        localStorage.setItem("walletBalance", (balance + amount).toString())
      }
    },
    [address, balance],
  )

  return (
    <WalletContext.Provider
      value={{ 
        isConnected, 
        address, 
        balance, 
        isConnecting, 
        connectWallet, 
        disconnectWallet, 
        updateBalance,
        isFarcasterWallet,
        farcasterUser
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
