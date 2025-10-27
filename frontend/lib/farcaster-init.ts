/**
 * Farcaster SDK Initialization Script
 * 
 * This script initializes the Farcaster SDK and calls ready() as early as possible
 * to dismiss the splash screen when running in a Farcaster environment.
 */

import { FarcasterMiniAppSDK } from '@farcaster/miniapp-sdk'

// Initialize SDK when this module is loaded
let sdk: FarcasterMiniAppSDK | null = null
let readyCalled = false

export function initializeFarcasterSDK(): FarcasterMiniAppSDK | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    // Create SDK instance
    sdk = new FarcasterMiniAppSDK()
    
    // Call ready() immediately to dismiss splash screen
    if (!readyCalled && sdk.actions?.ready) {
      readyCalled = true
      sdk.actions.ready()
        .then(() => {
          console.log('✅ Farcaster SDK ready() called - splash screen dismissed')
        })
        .catch((error) => {
          console.warn('⚠️ ready() call failed - might not be in Farcaster environment:', error)
          readyCalled = false
        })
    }
    
    return sdk
  } catch (error) {
    console.warn('⚠️ Could not initialize Farcaster SDK (might not be in Farcaster environment):', error)
    return null
  }
}

// Auto-initialize on module load
if (typeof window !== 'undefined') {
  initializeFarcasterSDK()
}

export function getFarcasterSDK(): FarcasterMiniAppSDK | null {
  return sdk
}
