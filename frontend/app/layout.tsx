'use client'

import type React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Fonts
const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Beyond Banter - Soccer Prediction Market',
  description:
    'Decentralized soccer prediction market where users stake tokens on match outcomes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${geist.className} ${geistMono.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
