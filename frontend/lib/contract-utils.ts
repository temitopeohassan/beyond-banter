import { BrowserProvider, Contract, parseUnits, formatUnits } from 'ethers'
import type { Eip1193Provider } from 'ethers'

// Smart Contract ABI - Update this with your actual contract ABI
const PREDICTION_MARKET_ABI = [
  // Match management
  "function createMatch(string teamA, string teamB, uint256 startTime) external returns (uint256)",
  "function stake(uint256 matchId, uint8 outcome, uint256 amount) external payable",
  "function resolveMatch(uint256 matchId, uint8 result) external",
  "function distributeRewards(uint256 matchId) external",
  
  // View functions
  "function matches(uint256 matchId) external view returns (string teamA, string teamB, uint256 startTime, uint256 endTime, uint8 status, uint256 totalPool, uint256 poolA, uint256 poolB, uint8 result, bool resolved)",
  "function getUserStake(uint256 matchId, address user) external view returns (uint256 amount, uint8 outcome)",
  "function calculateReward(uint256 matchId, address user) external view returns (uint256)",
  
  // Events
  "event MatchCreated(uint256 indexed matchId, string teamA, string teamB, uint256 startTime)",
  "event Staked(uint256 indexed matchId, address indexed user, uint8 outcome, uint256 amount)",
  "event MatchResolved(uint256 indexed matchId, uint8 result)",
  "event RewardsDistributed(uint256 indexed matchId, address indexed user, uint256 amount)"
]

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT || ''

/**
 * Get contract instance
 */
export async function getContract(provider: BrowserProvider): Promise<Contract> {
  const signer = await provider.getSigner()
  return new Contract(CONTRACT_ADDRESS, PREDICTION_MARKET_ABI, signer)
}

/**
 * Get read-only contract instance
 */
export async function getReadOnlyContract(provider: BrowserProvider): Promise<Contract> {
  return new Contract(CONTRACT_ADDRESS, PREDICTION_MARKET_ABI, provider)
}

/**
 * Stake tokens on a match outcome
 * @param provider - Ethers provider
 * @param matchId - Match ID
 * @param outcome - 0 for Team A, 1 for Team B, 2 for Draw
 * @param amount - Amount in USDC (will be converted to wei)
 */
export async function stakeOnMatch(
  provider: BrowserProvider,
  matchId: number,
  outcome: 0 | 1 | 2,
  amount: string
): Promise<{ hash: string; wait: () => Promise<any> }> {
  try {
    const contract = await getContract(provider)
    const amountWei = parseUnits(amount, 6) // USDC has 6 decimals
    
    const tx = await contract.stake(matchId, outcome, amountWei)
    return tx
  } catch (error) {
    console.error('Error staking on match:', error)
    throw error
  }
}

/**
 * Get match details
 */
export async function getMatchDetails(provider: BrowserProvider, matchId: number) {
  try {
    const contract = await getReadOnlyContract(provider)
    const match = await contract.matches(matchId)
    
    return {
      teamA: match.teamA,
      teamB: match.teamB,
      startTime: Number(match.startTime),
      endTime: Number(match.endTime),
      status: Number(match.status),
      totalPool: formatUnits(match.totalPool, 6),
      poolA: formatUnits(match.poolA, 6),
      poolB: formatUnits(match.poolB, 6),
      result: Number(match.result),
      resolved: match.resolved
    }
  } catch (error) {
    console.error('Error getting match details:', error)
    throw error
  }
}

/**
 * Get user's stake for a match
 */
export async function getUserStake(
  provider: BrowserProvider,
  matchId: number,
  userAddress: string
) {
  try {
    const contract = await getReadOnlyContract(provider)
    const stake = await contract.getUserStake(matchId, userAddress)
    
    return {
      amount: formatUnits(stake.amount, 6),
      outcome: Number(stake.outcome)
    }
  } catch (error) {
    console.error('Error getting user stake:', error)
    throw error
  }
}

/**
 * Calculate potential reward for a user
 */
export async function calculateReward(
  provider: BrowserProvider,
  matchId: number,
  userAddress: string
): Promise<string> {
  try {
    const contract = await getReadOnlyContract(provider)
    const reward = await contract.calculateReward(matchId, userAddress)
    
    return formatUnits(reward, 6)
  } catch (error) {
    console.error('Error calculating reward:', error)
    throw error
  }
}

/**
 * Distribute rewards for a match (admin function)
 */
export async function distributeRewards(
  provider: BrowserProvider,
  matchId: number
): Promise<{ hash: string; wait: () => Promise<any> }> {
  try {
    const contract = await getContract(provider)
    const tx = await contract.distributeRewards(matchId)
    
    return tx
  } catch (error) {
    console.error('Error distributing rewards:', error)
    throw error
  }
}

/**
 * Send a custom transaction
 */
export async function sendTransaction(
  provider: BrowserProvider,
  to: string,
  value: string,
  data?: string
): Promise<{ hash: string; wait: () => Promise<any> }> {
  try {
    const signer = await provider.getSigner()
    
    const tx = await signer.sendTransaction({
      to,
      value: parseUnits(value, 18),
      data: data || '0x'
    })
    
    return tx
  } catch (error) {
    console.error('Error sending transaction:', error)
    throw error
  }
}

/**
 * Get user's balance
 */
export async function getBalance(provider: BrowserProvider, address: string): Promise<string> {
  try {
    const balance = await provider.getBalance(address)
    return formatUnits(balance, 18)
  } catch (error) {
    console.error('Error getting balance:', error)
    throw error
  }
}

export default {
  getContract,
  getReadOnlyContract,
  stakeOnMatch,
  getMatchDetails,
  getUserStake,
  calculateReward,
  distributeRewards,
  sendTransaction,
  getBalance
}

