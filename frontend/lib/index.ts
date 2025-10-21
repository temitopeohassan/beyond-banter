/**
 * Centralized exports for easy imports throughout the app
 */

// Wallet & Web3
export { useWallet, WalletProvider } from './wallet-context'
export { useStake } from './use-stake'

// Smart Contract Utilities
export {
  stakeOnMatch,
  getMatchDetails,
  getUserStake,
  calculateReward,
  distributeRewards,
  sendTransaction,
  getBalance,
  getContract,
  getReadOnlyContract
} from './contract-utils'

// Farcaster SDK
export {
  initializeFarcasterSDK,
  getFarcasterContext,
  isInFarcasterFrame,
  openUrl,
  closeFrame,
  addFrameEventListener,
  removeFrameEventListener
} from './farcaster-sdk'

export type { FarcasterContext } from './farcaster-sdk'
export type { StakeParams } from './use-stake'

// Reown Configuration
export { modal, projectId, metadata, networks } from './reown-config'

// Utilities
export { cn } from './utils'

