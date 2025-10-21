import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { base, baseSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!projectId) {
  console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Please get your project ID from https://cloud.reown.com/')
}

// Define metadata for your app
export const metadata = {
  name: 'BeyondBanter',
  description: 'A decentralized soccer prediction market',
  url: process.env.NEXT_PUBLIC_FARCASTER_APP_URL || 'https://beyondbanter.app',
  icons: ['/placeholder-logo.svg']
}

// Define supported networks
export const networks = [base, baseSepolia]

// Create the EthersAdapter
const ethersAdapter = new EthersAdapter()

// Create the modal
export const modal = createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: false,
    emailShowWallets: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8B5CF6',
    '--w3m-border-radius-master': '2px'
  }
})

export default modal

