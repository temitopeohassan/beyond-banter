"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { StakingPanel } from "@/components/staking-panel"
import { MatchDetails } from "@/components/match-details"
import { PoolChart } from "@/components/pool-chart"
import { RecentStakes } from "@/components/recent-stakes"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock match data
const mockMatch = {
  id: "1",
  teamA: "Manchester United",
  teamB: "Liverpool",
  startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
  status: "active",
  totalPool: 125000,
  poolA: 75000,
  poolB: 50000,
  odds: { teamA: 1.45, teamB: 2.8 },
  resolved: false,
  result: null,
  league: "Premier League",
  stadium: "Old Trafford",
  date: "2024-10-20",
}

const mockStakes = [
  {
    id: "1",
    user: "0x1234...5678",
    team: "Manchester United",
    amount: 5000,
    odds: 1.45,
    timestamp: Date.now() - 300000,
  },
  { id: "2", user: "0x9876...5432", team: "Liverpool", amount: 3000, odds: 2.8, timestamp: Date.now() - 240000 },
  {
    id: "3",
    user: "0x5555...6666",
    team: "Manchester United",
    amount: 7500,
    odds: 1.45,
    timestamp: Date.now() - 180000,
  },
  { id: "4", user: "0x7777...8888", team: "Liverpool", amount: 2000, odds: 2.8, timestamp: Date.now() - 120000 },
  {
    id: "5",
    user: "0x9999...0000",
    team: "Manchester United",
    amount: 4200,
    odds: 1.45,
    timestamp: Date.now() - 60000,
  },
]

export default function MatchPage() {
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B" | null>(null)

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Markets
          </Button>
        </Link>

        {/* Match Header */}
        <MatchDetails match={mockMatch} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Pool Chart and Stakes */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pool Distribution Chart */}
            <PoolChart match={mockMatch} />

            {/* Recent Stakes */}
            <RecentStakes stakes={mockStakes} />
          </div>

          {/* Right Column - Staking Panel */}
          <div>
            <StakingPanel match={mockMatch} selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
