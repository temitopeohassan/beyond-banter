# 🚀 Quick Start Guide

Get your BeyondBanter app running with Reown and Farcaster in 5 minutes!

## Step 1: Get Your WalletConnect Project ID (2 minutes)

1. Go to [https://cloud.reown.com/](https://cloud.reown.com/)
2. Click "Sign Up" or "Log In"
3. Click "Create New Project"
4. Enter project name: "BeyondBanter"
5. Copy your **Project ID**

## Step 2: Configure Environment Variables (1 minute)

Create a file named `.env.local` in the `frontend` folder:

```bash
# In the frontend directory
cp .env.example .env.local
```

Edit `.env.local` and paste your Project ID:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=paste_your_project_id_here
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_CHAIN_NAME=Base
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_FARCASTER_APP_URL=https://your-app-url.com
```

## Step 3: Run the App (1 minute)

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 4: Test Wallet Connection (1 minute)

1. Click the **"Connect Wallet"** button in the header
2. Choose your wallet (MetaMask, Coinbase Wallet, etc.)
3. Approve the connection
4. Switch to **Base** or **Base Sepolia** network if prompted
5. ✅ You're connected!

## 🎯 What Works Now

### ✅ Wallet Features
- Connect/disconnect wallet
- Display wallet address
- Show ETH balance
- Network switching

### ✅ Staking (requires smart contract)
- Place stakes on matches
- Real blockchain transactions
- Transaction status notifications

### ✅ Farcaster Integration
- Auto-detects Farcaster environment
- Shows Farcaster user info
- Frame actions (open URL, close frame)

## 🔜 Next Steps

### Deploy Smart Contracts

You'll need to deploy the prediction market smart contract to make staking work. The contract should have these functions:

```solidity
function stake(uint256 matchId, uint8 outcome, uint256 amount) external payable;
function getMatchDetails(uint256 matchId) external view returns (...);
function getUserStake(uint256 matchId, address user) external view returns (...);
```

Then update in `.env.local`:
```env
NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT=0xYourDeployedContractAddress
```

### Update Contract ABI

Edit `frontend/lib/contract-utils.ts` and replace the ABI with your contract's ABI:

```typescript
const PREDICTION_MARKET_ABI = [
  // Paste your contract ABI here
]
```

### Test on Testnet First

Use **Base Sepolia** for testing:
1. Get testnet ETH from [Base Sepolia Faucet](https://www.base.org/faucet)
2. Deploy contracts to testnet
3. Test all features
4. Deploy to mainnet when ready

## 📱 Testing as Farcaster Mini App

1. Deploy your app to a public URL (Vercel, Netlify, etc.)
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_FARCASTER_APP_URL=https://your-deployed-url.com
   ```
3. Create a Farcaster Frame at [https://warpcast.com/~/developers](https://warpcast.com/~/developers)
4. Test in Warpcast mobile app

## 💡 Usage Examples

### In Your Components

```tsx
import { useWallet } from "@/lib/wallet-context"
import { useStake } from "@/lib/use-stake"

function MyComponent() {
  const { isConnected, address, balance, farcasterContext } = useWallet()
  const { stake, isStaking } = useStake()
  
  const handleStake = async () => {
    const result = await stake({
      matchId: 1,
      outcome: 0, // 0: Team A, 1: Team B
      amount: "100"
    })
    
    if (result.success) {
      console.log("Stake placed!", result.txHash)
    }
  }
  
  return (
    <div>
      {isConnected ? (
        <>
          <p>Address: {address}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={handleStake} disabled={isStaking}>
            Place Stake
          </button>
        </>
      ) : (
        <p>Please connect wallet</p>
      )}
    </div>
  )
}
```

## 🎨 Customize

### Change Theme

Edit `frontend/lib/reown-config.ts`:

```typescript
themeMode: 'light', // or 'dark'
themeVariables: {
  '--w3m-accent': '#FF0000', // Your brand color
}
```

### Add More Networks

```typescript
import { mainnet, polygon, optimism } from '@reown/appkit/networks'

export const networks = [base, baseSepolia, mainnet, polygon, optimism]
```

## ❓ Need Help?

- **Full Documentation**: See `REOWN_FARCASTER_SETUP.md`
- **Integration Details**: See `INTEGRATION_SUMMARY.md`
- **Reown Docs**: [https://docs.reown.com/appkit](https://docs.reown.com/appkit)
- **Farcaster Docs**: [https://miniapps.farcaster.xyz](https://miniapps.farcaster.xyz)

## ✅ Checklist

- [ ] Got WalletConnect Project ID from cloud.reown.com
- [ ] Created `.env.local` with Project ID
- [ ] App runs on localhost:3000
- [ ] Wallet connects successfully
- [ ] (Optional) Deployed smart contracts
- [ ] (Optional) Updated contract address in `.env.local`
- [ ] (Optional) Updated contract ABI in `contract-utils.ts`
- [ ] (Optional) Deployed to production for Farcaster testing

---

**You're all set! Start building! 🎉**

