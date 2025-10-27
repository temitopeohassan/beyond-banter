'use client'

import { useEffect } from 'react'

/**
 * Farcaster Init Script Component
 * 
 * This component calls sdk.actions.ready() as soon as it mounts on the client.
 * It's added as a separate client component to ensure it runs immediately.
 */
export function FarcasterInitScript() {
  useEffect(() => {
    // Call ready() as soon as the component mounts (client-side only)
    const callReady = async () => {
      try {
        // Dynamic import to ensure it's client-side only
        const { FarcasterMiniAppSDK } = await import('@farcaster/miniapp-sdk')
        const sdk = new FarcasterMiniAppSDK()
        
        if (sdk.actions?.ready) {
          await sdk.actions.ready()
          console.log('✅ Farcaster SDK ready() called from InitScript component')
        }
      } catch (error) {
        console.warn('⚠️ Could not call SDK ready() (might not be in Farcaster environment):', error)
      }
    }
    
    callReady()
  }, [])

  return null
}
