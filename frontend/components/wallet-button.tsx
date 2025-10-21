"use client"

import { useWallet } from "@/lib/wallet-context"
import { useAppKit } from "@reown/appkit/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, Copy, Check, User } from "lucide-react"
import { useState } from "react"

export function WalletButton() {
  const { isConnected, address, balance, isConnecting, farcasterContext } = useWallet()
  const { open } = useAppKit()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleConnect = () => {
    open()
  }

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Wallet className="w-4 h-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <span className="sm:hidden">{address?.slice(0, 4)}...</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {farcasterContext.user && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <div>
                <p className="font-semibold">{farcasterContext.user.displayName || farcasterContext.user.username}</p>
                <p className="text-xs text-muted-foreground">FID: {farcasterContext.user.fid}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="px-2 py-1.5">
          <p className="text-xs text-muted-foreground mb-1">Connected Wallet</p>
          <p className="text-sm font-mono font-semibold text-foreground break-all">{address}</p>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <p className="text-xs text-muted-foreground mb-1">ETH Balance</p>
          <p className="text-lg font-bold text-foreground">{parseFloat(balance).toFixed(4)} ETH</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleConnect} className="cursor-pointer">
          <Wallet className="w-4 h-4 mr-2" />
          Wallet Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => open({ view: "Networks" })} className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Switch Network
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
