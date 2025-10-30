"use client"

import { useEffect } from "react"

export function FarcasterInitScript() {
  useEffect(() => {
    const initFarcaster = async () => {
      try {
        const { sdk } = await import("@farcaster/miniapp-sdk")

        // Ensure we're running inside the Farcaster Mini App
        if (!sdk.isMiniApp()) {
          console.log("Not running inside Farcaster Mini App — skipping sdk.actions.ready()")
          return
        }

        await sdk.actions.ready({
          disableNativeGestures: false, // optional
        })

        console.log("✅ Farcaster SDK ready() successfully called")
      } catch (error) {
        console.warn("⚠️ Farcaster SDK initialization failed:", error)
      }
    }

    initFarcaster()
  }, [])

  return null
}
