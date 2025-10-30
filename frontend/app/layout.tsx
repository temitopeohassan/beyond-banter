import './globals.css'
import { ReactNode } from 'react'
import { Inter, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Beyond Banter - Soccer Prediction Market',
  description:
    'Decentralized soccer prediction market where users stake tokens on match outcomes',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistMono.className} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
