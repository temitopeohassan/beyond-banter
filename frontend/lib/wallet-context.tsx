"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  updateBalance: (amount: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock wallet data
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      const mockBalance = Math.floor(Math.random() * 50000) + 5000

      setAddress(mockAddress)
      setBalance(mockBalance)
      setIsConnected(true)

      // Store in localStorage for persistence
      localStorage.setItem("walletAddress", mockAddress)
      localStorage.setItem("walletBalance", mockBalance.toString())
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")
  }, [])

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
      value={{ isConnected, address, balance, isConnecting, connectWallet, disconnectWallet, updateBalance }}
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
