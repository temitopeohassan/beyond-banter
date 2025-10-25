"use client"

import { Header } from "@/components/header"
import { useWallet } from "@/lib/wallet-context"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { LeagueRankings } from "@/components/league-rankings"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock user profile data
const mockUserProfile = {
  username: "SoccerPro42",
  joinDate: new Date("2024-01-15"),
  totalMatches: 32,
  totalStaked: 125000,
  totalEarned: 34500,
  totalReturned: 159500,
  roi: 27.6,
  winRate: 0.688,
  averageOdds: 1.72,
  bestWin: 15000,
  longestWinStreak: 7,
  currentStreak: 3,
  favoriteLeague: "Premier League",
  favoriteTeam: "Manchester United",
}

const mockLeagueStats = [
  { league: "Premier League", matches: 12, wins: 9, roi: 32.5 },
  { league: "La Liga", matches: 8, wins: 5, roi: 18.2 },
  { league: "Serie A", matches: 7, wins: 4, roi: 22.1 },
  { league: "Bundesliga", matches: 5, wins: 3, roi: 15.8 },
]

const mockRankings = [
  { rank: 1, username: "CryptoKing", totalEarned: 125000, roi: 45.2 },
  { rank: 2, username: "GoalMaster", totalEarned: 98500, roi: 38.1 },
  { rank: 3, username: "SoccerPro42", totalEarned: 34500, roi: 27.6 },
  { rank: 4, username: "PredictorX", totalEarned: 28300, roi: 24.5 },
  { rank: 5, username: "BetWizard", totalEarned: 22100, roi: 19.8 },
]

export default function ProfilePage() {
  const { isConnected, address } = useWallet()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">Please connect your wallet to view your profile</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Go to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Markets
          </Button>
        </Link>

        {/* Profile Header */}
        <ProfileHeader profile={mockUserProfile} address={address} />

        {/* Profile Stats */}
        <ProfileStats profile={mockUserProfile} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Left Column - Performance Metrics */}
          <div className="lg:col-span-2">
            <PerformanceMetrics leagueStats={mockLeagueStats} />
          </div>

          {/* Right Column - League Rankings */}
          <div>
            <LeagueRankings rankings={mockRankings} userRank={3} />
          </div>
        </div>
      </main>
    </div>
  )
}
