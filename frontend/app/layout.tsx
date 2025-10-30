"use client"

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { useEffect } from "react"
import { WalletProvider } from "@/lib/wallet-context"
import { FarcasterProvider } from "@/lib/farcaster-context"
import { sdk } from "@farcaster/miniapp-sdk"
import "./globals.css"

// Fonts
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoalPredict - Soccer Prediction Market",
  description:
    "Decentralized soccer prediction market where users stake tokens on match outcomes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const initFarcaster = async () => {
      try {
        // Run only in Farcaster Mini App environment
        if (!sdk.isMiniApp()) {
          console.log("🧭 Not in Farcaster Mini App — skipping sdk.actions.ready()")
          return
        }

        await sdk.actions.ready({
          disableNativeGestures: false, // optional
        })

        console.log("✅ Farcaster SDK ready() called — splash screen dismissed")
      } catch (error) {
        console.error("❌ Failed to initialize Farcaster SDK:", error)
      }
    }

    initFarcaster()
  }, [])

  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_geist.className} ${_geistMono.className}`}>
        <FarcasterProvider>
          <WalletProvider>{children}</WalletProvider>
        </FarcasterProvider>
        <Analytics />
      </body>
    </html>
  )
}
