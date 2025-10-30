"use client"

/**
 * Farcaster SDK Initialization Script
 *
 * This script initializes the Farcaster Mini App SDK and calls ready()
 * as early as possible to dismiss the splash screen when running inside Farcaster.
 */

import { sdk } from "@farcaster/miniapp-sdk"

let readyCalled = false

export async function initializeFarcasterSDK() {
  if (typeof window === "undefined") return

  try {
    // Ensure this runs only inside the Farcaster environment
    if (!sdk.isMiniApp()) {
      console.log("🧭 Not running inside Farcaster — skipping sdk.actions.ready()")
      return
    }

    if (!readyCalled) {
      readyCalled = true
      await sdk.actions.ready({
        disableNativeGestures: false, // optional
      })
      console.log("✅ Farcaster SDK ready() called — splash screen dismissed")
    }
  } catch (error) {
    console.error("❌ Failed to initialize Farcaster SDK:", error)
    readyCalled = false
  }
}

// Optionally auto-initialize immediately on load (browser only)
if (typeof window !== "undefined") {
  // Schedule as soon as possible after hydration
  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(initializeFarcasterSDK, { timeout: 100 })
  } else {
    setTimeout(initializeFarcasterSDK, 0)
  }
}

export { sdk }
