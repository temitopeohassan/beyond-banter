import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface User {
  id?: string
  walletAddress: string
  username: string
  totalStaked: number
  totalEarned: number
}

export interface Match {
  id: string
  teamA: string
  teamB: string
  startTime: Date | string
  endTime?: Date | string
  status: 'active' | 'upcoming' | 'resolved'
  totalPool: number
  poolA: number
  poolB: number
  result?: 'teamA' | 'teamB' | 'draw' | null
  resolved: boolean
}

export interface Stake {
  userId: string
  matchId: string
  outcome: 'teamA' | 'teamB'
  amount: number
  timestamp: Date | string
}

export interface OracleFeed {
  matchId: string
  source: string
  result: 'teamA' | 'teamB' | 'draw'
  verifiedAt: Date | string
}

// Users
export const getUsers = () => api.get<User[]>(`/api/users`).then(r => r.data)
export const getUser = (id: string) => api.get<User>(`/api/users/${id}`).then(r => r.data)
export const createUser = (data: Omit<User, 'id'>) => api.post<User>(`/api/users`, data).then(r => r.data)

// Matches
export const getMatches = () => api.get<Match[]>(`/api/matches`).then(r => r.data)
export const getMatch = (id: string) => api.get<Match>(`/api/matches/${id}`).then(r => r.data)
export const createMatch = (data: Match) => api.post<Match>(`/api/matches`, data).then(r => r.data)

// Stakes
export const createStake = (data: Stake) => api.post(`/api/stakes`, data).then(r => r.data)

// Oracle
export interface OracleResponse {
  ok: boolean
  message: string
  rewardsDistributed: {
    distributed: number
    totalAmount: number
  } | null
  distributionError: string | null
}

export const createOracleFeed = (data: OracleFeed) => 
  api.post<OracleResponse>(`/api/oracle`, data).then(r => r.data)

// Transactions
export const distributeRewards = (matchId: string) => 
  api.post(`/api/transactions/distribute/${matchId}`).then(r => r.data)

