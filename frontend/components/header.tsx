"use client"

import { WalletButton } from "@/components/wallet-button"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">BB</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">BeyondBanter</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Markets
          </Link>
          <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">
            Portfolio
          </Link>
          <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">
            Leaderboard
          </Link>
        </nav>

        <WalletButton />
      </div>
    </header>
  )
}
