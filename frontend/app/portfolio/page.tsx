"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { PortfolioChart } from "@/components/portfolio-chart"
import { StakesTable } from "@/components/stakes-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock portfolio data
const mockPortfolioData = {
  totalStaked: 45000,
  totalEarned: 12500,
  totalReturned: 57500,
  roi: 27.8,
  activeStakes: 8,
  resolvedStakes: 24,
  winRate: 0.667,
}

const mockActiveStakes = [
  {
    id: "1",
    matchId: "1",
    teamA: "Manchester United",
    teamB: "Liverpool",
    stakedTeam: "Manchester United",
    amount: 5000,
    odds: 1.45,
    potentialWinnings: 7250,
    status: "active",
    placedAt: new Date(Date.now() - 30 * 60 * 1000),
    matchTime: new Date(Date.now() + 90 * 60 * 1000),
  },
  {
    id: "2",
    matchId: "2",
    teamA: "Barcelona",
    teamB: "Real Madrid",
    stakedTeam: "Real Madrid",
    amount: 3500,
    odds: 1.95,
    potentialWinnings: 6825,
    status: "active",
    placedAt: new Date(Date.now() - 45 * 60 * 1000),
    matchTime: new Date(Date.now() + 210 * 60 * 1000),
  },
  {
    id: "3",
    matchId: "3",
    teamA: "Bayern Munich",
    teamB: "Borussia Dortmund",
    stakedTeam: "Bayern Munich",
    amount: 7500,
    odds: 1.55,
    potentialWinnings: 11625,
    status: "active",
    placedAt: new Date(Date.now() - 60 * 60 * 1000),
    matchTime: new Date(Date.now() + 330 * 60 * 1000),
  },
]

const mockResolvedStakes = [
  {
    id: "4",
    matchId: "4",
    teamA: "PSG",
    teamB: "Marseille",
    stakedTeam: "PSG",
    amount: 4000,
    odds: 1.38,
    potentialWinnings: 5520,
    actualWinnings: 5520,
    status: "won",
    placedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    matchId: "5",
    teamA: "Juventus",
    teamB: "AC Milan",
    stakedTeam: "AC Milan",
    amount: 3000,
    odds: 2.1,
    potentialWinnings: 6300,
    actualWinnings: 0,
    status: "lost",
    placedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    matchId: "6",
    teamA: "Chelsea",
    teamB: "Arsenal",
    stakedTeam: "Chelsea",
    amount: 6000,
    odds: 1.72,
    potentialWinnings: 10320,
    actualWinnings: 10320,
    status: "won",
    placedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
]

export default function PortfolioPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Portfolio</h1>
          <p className="text-muted-foreground">Track your stakes, earnings, and performance</p>
        </div>

        {/* Portfolio Overview */}
        <PortfolioOverview data={mockPortfolioData} />

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-12">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Stakes</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <PortfolioChart />
          </TabsContent>

          {/* Active Stakes Tab */}
          <TabsContent value="active" className="mt-6">
            <StakesTable stakes={mockActiveStakes} type="active" />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <StakesTable stakes={mockResolvedStakes} type="resolved" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
