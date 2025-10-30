"use client"

import { useEffect } from "react"
import { useWallet } from "@/lib/wallet-context"
import Link from "next/link"

export function Header() {
  const { isConnected, isConnecting, connectWallet } = useWallet()

  // Auto-connect when running inside Farcaster
  useEffect(() => {
    if (typeof window === "undefined") return
    const fc = (window as any).farcaster
    if (!fc) return
    if (isConnected || isConnecting) return

    // Defer one frame to avoid layout jitter on first paint
    const id = requestAnimationFrame(() => {
      void connectWallet().catch(() => {
        // swallow errors; user may not have a wallet connected yet
      })
    })
    return () => cancelAnimationFrame(id)
  }, [isConnected, isConnecting, connectWallet])

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">BB</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Beyond Banter</h1>
        </Link>

        {/* Top navigation removed; replaced by a fixed footer tab bar */}

        {/* WalletButton removed for Farcaster-only Mini App */}
      </div>
    </header>
  )
}
