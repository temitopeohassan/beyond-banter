"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MatchCard } from "@/components/match-card"
import { StatsOverview } from "@/components/stats-overview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for matches
const mockMatches = [
  {
    id: "1",
    teamA: "Manchester United",
    teamB: "Liverpool",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: "active",
    totalPool: 125000,
    poolA: 75000,
    poolB: 50000,
    odds: { teamA: 1.45, teamB: 2.8 },
  },
  {
    id: "2",
    teamA: "Barcelona",
    teamB: "Real Madrid",
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    status: "active",
    totalPool: 98500,
    poolA: 55000,
    poolB: 43500,
    odds: { teamA: 1.92, teamB: 1.95 },
  },
  {
    id: "3",
    teamA: "Bayern Munich",
    teamB: "Borussia Dortmund",
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    status: "active",
    totalPool: 87200,
    poolA: 52000,
    poolB: 35200,
    odds: { teamA: 1.55, teamB: 2.45 },
  },
  {
    id: "4",
    teamA: "PSG",
    teamB: "Marseille",
    startTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    status: "active",
    totalPool: 64300,
    poolA: 42000,
    poolB: 22300,
    odds: { teamA: 1.38, teamB: 3.2 },
  },
]

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("active")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <StatsOverview />

        {/* Matches Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Soccer Matches</h2>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Match</Button>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming matches at the moment</p>
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resolved matches yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
