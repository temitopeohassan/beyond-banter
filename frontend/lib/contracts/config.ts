import { http, createConfig } from 'wagmi'
import { celo } from 'wagmi/chains'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'

const contractAddress = process.env.NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS as `0x${string}`

if (!contractAddress) {
  console.warn('NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS not set')
}

export const wagmiConfig = createConfig({
  chains: [celo],
  transports: {
    [celo.id]: http('https://forno.celo.org'),
  },
  connectors: [
    farcasterMiniApp(),
  ],
  ssr: true,
})

export const CONTRACT_ADDRESS = contractAddress || '0x35d81bE253D8D3cC974910a8fAb6621e670f6be6' as `0x${string}`

