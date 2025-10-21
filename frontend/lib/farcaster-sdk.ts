"use client"

import sdk from "@farcaster/frame-sdk"

export interface FarcasterContext {
  user?: {
    fid: number
    username?: string
    displayName?: string
    pfpUrl?: string
  }
  isSDKLoaded: boolean
}

let farcasterContext: FarcasterContext = {
  isSDKLoaded: false
}

/**
 * Initialize Farcaster Frame SDK
 * Call this in your app initialization
 */
export async function initializeFarcasterSDK(): Promise<FarcasterContext> {
  try {
    // Check if running in Farcaster environment
    const context = await sdk.context
    
    if (context?.user) {
      farcasterContext = {
        user: {
          fid: context.user.fid,
          username: context.user.username,
          displayName: context.user.displayName,
          pfpUrl: context.user.pfpUrl
        },
        isSDKLoaded: true
      }
    } else {
      farcasterContext = {
        isSDKLoaded: true
      }
    }

    // Add frame to client
    sdk.actions.ready()
    
    return farcasterContext
  } catch (error) {
    console.error("Failed to initialize Farcaster SDK:", error)
    return {
      isSDKLoaded: false
    }
  }
}

/**
 * Get current Farcaster context
 */
export function getFarcasterContext(): FarcasterContext {
  return farcasterContext
}

/**
 * Check if running inside Farcaster frame
 */
export function isInFarcasterFrame(): boolean {
  return farcasterContext.isSDKLoaded && !!farcasterContext.user
}

/**
 * Open an external URL in Farcaster
 */
export function openUrl(url: string) {
  if (isInFarcasterFrame()) {
    sdk.actions.openUrl(url)
  } else {
    window.open(url, '_blank')
  }
}

/**
 * Close the Farcaster frame
 */
export function closeFrame() {
  if (isInFarcasterFrame()) {
    sdk.actions.close()
  }
}

/**
 * Add frame event listeners
 */
export function addFrameEventListener(
  event: 'primaryButtonClicked' | 'frameAdded' | 'frameAddRejected' | 'frameRemoved' | 'notificationDetails',
  callback: (data: any) => void
) {
  if (typeof window !== 'undefined') {
    sdk.on(event as any, callback)
  }
}

/**
 * Remove frame event listener
 */
export function removeFrameEventListener(
  event: 'primaryButtonClicked' | 'frameAdded' | 'frameAddRejected' | 'frameRemoved' | 'notificationDetails',
  callback: (data: any) => void
) {
  if (typeof window !== 'undefined') {
    sdk.off(event as any, callback)
  }
}

export default {
  initializeFarcasterSDK,
  getFarcasterContext,
  isInFarcasterFrame,
  openUrl,
  closeFrame,
  addFrameEventListener,
  removeFrameEventListener
}

