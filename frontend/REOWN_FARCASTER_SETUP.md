# Reown AppKit & Farcaster SDK Integration

This document explains how to use Reown (WalletConnect AppKit) and Farcaster SDK in the BeyondBanter application.

## 📦 Installed Packages

The following packages have been installed:

```bash
npm install @reown/appkit @reown/appkit-adapter-ethers ethers@6.13.2 @farcaster/frame-sdk viem@2.x --legacy-peer-deps
```

## 🔧 Configuration

### 1. Environment Variables

Create a `.env.local` file in the frontend directory (use `.env.example` as a template):

```env
# Get your project ID from https://cloud.reown.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_CHAIN_NAME=Base
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# Smart Contract Address (update after deployment)
NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT=0x0000000000000000000000000000000000000000

# Farcaster Configuration
NEXT_PUBLIC_FARCASTER_APP_URL=https://your-app-url.com
```

### 2. Get Your WalletConnect Project ID

1. Go to [https://cloud.reown.com/](https://cloud.reown.com/)
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file

## 🚀 Usage

### Wallet Connection

The wallet connection is handled automatically through the `WalletProvider` component. Users can connect their wallets using the `WalletButton` component.

```tsx
import { WalletButton } from "@/components/wallet-button"

export function Header() {
  return (
    <header>
      <WalletButton />
    </header>
  )
}
```

### Using the Wallet Context

```tsx
import { useWallet } from "@/lib/wallet-context"

export function MyComponent() {
  const { 
    isConnected, 
    address, 
    balance, 
    provider,
    farcasterContext,
    updateBalance,
    sendTransaction
  } = useWallet()

  // Check if user is connected
  if (!isConnected) {
    return <p>Please connect your wallet</p>
  }

  // Access user data
  return (
    <div>
      <p>Address: {address}</p>
      <p>Balance: {balance} ETH</p>
      {farcasterContext.user && (
        <p>Farcaster User: {farcasterContext.user.displayName}</p>
      )}
    </div>
  )
}
```

### Staking on Matches

Use the `useStake` hook to place stakes:

```tsx
import { useStake } from "@/lib/use-stake"
import { useState } from "react"

export function StakingPanel({ matchId }: { matchId: number }) {
  const { stake, isStaking } = useStake()
  const [amount, setAmount] = useState("")
  const [outcome, setOutcome] = useState<0 | 1 | 2>(0)

  const handleStake = async () => {
    const result = await stake({
      matchId,
      outcome,
      amount
    })

    if (result.success) {
      console.log("Transaction hash:", result.txHash)
    }
  }

  return (
    <div>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to stake"
      />
      <select value={outcome} onChange={(e) => setOutcome(Number(e.target.value) as 0 | 1 | 2)}>
        <option value={0}>Team A</option>
        <option value={1}>Team B</option>
        <option value={2}>Draw</option>
      </select>
      <button onClick={handleStake} disabled={isStaking}>
        {isStaking ? "Staking..." : "Place Stake"}
      </button>
    </div>
  )
}
```

### Contract Interactions

The `contract-utils.ts` file provides helper functions for interacting with your smart contracts:

```tsx
import { useWallet } from "@/lib/wallet-context"
import { getMatchDetails, getUserStake, calculateReward } from "@/lib/contract-utils"
import { useEffect, useState } from "react"

export function MatchInfo({ matchId }: { matchId: number }) {
  const { provider, address } = useWallet()
  const [matchData, setMatchData] = useState(null)

  useEffect(() => {
    if (provider && address) {
      // Get match details
      getMatchDetails(provider, matchId).then(setMatchData)

      // Get user's stake
      getUserStake(provider, matchId, address).then(console.log)

      // Calculate potential reward
      calculateReward(provider, matchId, address).then(console.log)
    }
  }, [provider, address, matchId])

  // ... render match data
}
```

### Farcaster Integration

The app automatically detects if it's running inside a Farcaster frame:

```tsx
import { useWallet } from "@/lib/wallet-context"
import { openUrl, closeFrame } from "@/lib/farcaster-sdk"

export function FarcasterFeatures() {
  const { farcasterContext } = useWallet()

  if (!farcasterContext.user) {
    return <p>Not running in Farcaster</p>
  }

  return (
    <div>
      <p>Welcome, {farcasterContext.user.displayName}!</p>
      <p>FID: {farcasterContext.user.fid}</p>
      
      <button onClick={() => openUrl("https://example.com")}>
        Open URL
      </button>
      
      <button onClick={() => closeFrame()}>
        Close Frame
      </button>
    </div>
  )
}
```

## 🔑 Available Functions

### Wallet Context (`useWallet`)

- `isConnected`: Boolean - Whether wallet is connected
- `address`: string | null - User's wallet address
- `balance`: string - User's ETH balance
- `isConnecting`: boolean - Connection status
- `provider`: BrowserProvider | null - Ethers provider instance
- `farcasterContext`: FarcasterContext - Farcaster user data
- `updateBalance()`: Function - Refresh balance
- `sendTransaction(to, amount, data?)`: Function - Send a transaction

### Contract Utilities

- `stakeOnMatch(provider, matchId, outcome, amount)` - Place a stake
- `getMatchDetails(provider, matchId)` - Get match information
- `getUserStake(provider, matchId, userAddress)` - Get user's stake
- `calculateReward(provider, matchId, userAddress)` - Calculate potential reward
- `distributeRewards(provider, matchId)` - Distribute rewards (admin)
- `sendTransaction(provider, to, value, data?)` - Send custom transaction
- `getBalance(provider, address)` - Get ETH balance

### Farcaster SDK

- `initializeFarcasterSDK()` - Initialize SDK (called automatically)
- `getFarcasterContext()` - Get current context
- `isInFarcasterFrame()` - Check if in Farcaster
- `openUrl(url)` - Open URL in Farcaster
- `closeFrame()` - Close Farcaster frame
- `addFrameEventListener(event, callback)` - Listen to frame events
- `removeFrameEventListener(event, callback)` - Remove event listener

## 📝 Smart Contract ABI

Update the `PREDICTION_MARKET_ABI` in `lib/contract-utils.ts` with your actual contract ABI after deployment.

## 🌐 Supported Networks

Currently configured for:
- Base Mainnet (Chain ID: 8453)
- Base Sepolia (testnet)

You can add more networks in `lib/reown-config.ts`.

## 🎨 Customization

### Theme

Customize the Reown AppKit theme in `lib/reown-config.ts`:

```typescript
themeMode: 'dark', // or 'light'
themeVariables: {
  '--w3m-accent': '#8B5CF6',
  '--w3m-border-radius-master': '2px'
}
```

### Metadata

Update app metadata in `lib/reown-config.ts`:

```typescript
export const metadata = {
  name: 'BeyondBanter',
  description: 'Your description',
  url: 'https://your-url.com',
  icons: ['/your-icon.svg']
}
```

## 🔒 Security Notes

1. Never commit `.env.local` to version control
2. Always validate transaction parameters on the frontend and backend
3. Use appropriate gas limits for transactions
4. Implement proper error handling for all blockchain interactions
5. Keep your WalletConnect Project ID secure (though it's okay to expose in client)

## 📚 Resources

- [Reown AppKit Documentation](https://docs.reown.com/appkit/overview)
- [Farcaster Frame SDK](https://miniapps.farcaster.xyz)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)
- [Base Network Documentation](https://docs.base.org/)

## 🐛 Troubleshooting

### "No provider available" error
Make sure the user has connected their wallet before trying to interact with contracts.

### Transaction failures
Check that:
1. The contract address is correct in `.env.local`
2. The user is on the correct network (Base or Base Sepolia)
3. The user has enough ETH for gas fees
4. The contract ABI matches your deployed contract

### Farcaster features not working
Farcaster features only work when the app is running inside a Farcaster frame. Test locally by using the Farcaster developer tools.

