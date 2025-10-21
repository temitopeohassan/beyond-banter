"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { LeagueRankings } from "@/components/league-rankings"
import { WinnersList } from "@/components/winners-list"
import { LosersList } from "@/components/losers-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, TrendingDown } from "lucide-react"

// Mock leaderboard data
const mockLeaderboardData = [
  {
    rank: 1,
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    username: "CryptoKing",
    totalStaked: 125000,
    totalEarned: 87500,
    roi: 70.0,
    winRate: 0.75,
    matchesPlayed: 48,
  },
  {
    rank: 2,
    address: "0x8B3C6c72E3A9E8fa3b1d5Ce9A8f2C14e6B9D7A5",
    username: "BetMaster",
    totalStaked: 98000,
    totalEarned: 64200,
    roi: 65.5,
    winRate: 0.72,
    matchesPlayed: 42,
  },
  {
    rank: 3,
    address: "0x1Fd5A3B2C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F",
    username: "SoccerPro",
    totalStaked: 87500,
    totalEarned: 52500,
    roi: 60.0,
    winRate: 0.70,
    matchesPlayed: 40,
  },
  {
    rank: 4,
    address: "0xA1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B",
    username: "WinnerCircle",
    totalStaked: 76000,
    totalEarned: 44080,
    roi: 58.0,
    winRate: 0.69,
    matchesPlayed: 38,
  },
  {
    rank: 5,
    address: "0x9F8E7D6C5B4A39F28E17D06C95B84A93F82E71D",
    username: "MatchPredictor",
    totalStaked: 65000,
    totalEarned: 35750,
    roi: 55.0,
    winRate: 0.67,
    matchesPlayed: 35,
  },
]

const mockTopWinners = [
  {
    id: "1",
    username: "CryptoKing",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    amount: 25000,
    matchId: "1",
    teamBacked: "Manchester United",
    profit: 11250,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    username: "BetMaster",
    address: "0x8B3C6c72E3A9E8fa3b1d5Ce9A8f2C14e6B9D7A5",
    amount: 18000,
    matchId: "2",
    teamBacked: "Barcelona",
    profit: 8640,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    username: "SoccerPro",
    address: "0x1Fd5A3B2C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F",
    amount: 15000,
    matchId: "3",
    teamBacked: "Bayern Munich",
    profit: 7200,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
]

const mockTopLosers = [
  {
    id: "1",
    username: "RiskyBetter",
    address: "0x5D4C3B2A19F08E77D66C55B94A83F92E81D70C9",
    amount: 20000,
    matchId: "4",
    teamBacked: "PSG",
    loss: -20000,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "2",
    username: "UnluckyOne",
    address: "0x2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1",
    amount: 15000,
    matchId: "5",
    teamBacked: "Juventus",
    loss: -15000,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "3",
    username: "BadLuck",
    address: "0x7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6",
    amount: 12000,
    matchId: "6",
    teamBacked: "Chelsea",
    loss: -12000,
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
  },
]

export default function LeaderboardPage() {
  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">
            Top performers and biggest wins in the BeyondBanter prediction market
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Players</span>
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">2,847</div>
            <p className="text-xs text-muted-foreground mt-1">+124 this week</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Volume</span>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground">$8.4M</div>
            <p className="text-xs text-muted-foreground mt-1">All-time staked</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Average ROI</span>
              <TrendingDown className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-3xl font-bold text-foreground">42.3%</div>
            <p className="text-xs text-muted-foreground mt-1">Top 100 players</p>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
            <TabsTrigger value="rankings">Rankings</TabsTrigger>
            <TabsTrigger value="winners">Top Winners</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="mt-6">
            <LeagueRankings rankings={mockLeaderboardData} />
          </TabsContent>

          {/* Winners Tab */}
          <TabsContent value="winners" className="mt-6">
            <WinnersList winners={mockTopWinners} />
          </TabsContent>

          {/* Losers Tab */}
          <TabsContent value="losers" className="mt-6">
            <LosersList losers={mockTopLosers} />
          </TabsContent>
        </Tabs>
      </div>
    </LayoutWrapper>
  )
}

