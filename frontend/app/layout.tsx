'use client'

import type React from 'react'
import { useEffect } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WalletProvider } from '@/lib/wallet-context'
import { FarcasterProvider } from '@/lib/farcaster-context'
import './globals.css'

// Fonts
const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Beyond Banter - Where every fan’s prediction counts.',
  description:
    'Decentralized soccer prediction market where users stake tokens on match outcomes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const initFarcaster = async () => {
      if (typeof window === 'undefined') return

      // Only attempt init in Farcaster
      const isFarcaster = window.navigator.userAgent.includes('Farcaster')
      if (!isFarcaster) {
        console.log('ℹ️ Not running inside Farcaster — skipping ready()')
        return
      }

      try {
        const { FarcasterMiniAppSDK } = await import('@farcaster/miniapp-sdk')
        const sdk = new FarcasterMiniAppSDK()

        if (sdk.actions?.ready) {
          await sdk.actions.ready()
          console.log('✅ Farcaster SDK ready() called (layout.tsx)')
        } else {
          console.warn('⚠️ sdk.actions.ready() not found')
        }
      } catch (err) {
        console.warn('⚠️ Failed to initialize Farcaster SDK:', err)
      }
    }

    // Initialize after load for full compatibility
    if (document.readyState === 'complete') {
      initFarcaster()
    } else {
      window.addEventListener('load', initFarcaster)
      return () => window.removeEventListener('load', initFarcaster)
    }
  }, [])

  return (
    <html lang="en">
      <body className={`font-sans antialiased ${geist.className} ${geistMono.className}`}>
        <FarcasterProvider>
          <WalletProvider>{children}</WalletProvider>
        </FarcasterProvider>
        <Analytics />
      </body>
    </html>
  )
}
