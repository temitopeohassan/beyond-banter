'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { MatchCard } from '@/components/match-card'
import { StatsOverview } from '@/components/stats-overview'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getMatches, type Match } from '@/lib/api'
// Farcaster ready is called globally from layout; no SDK init here

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('active')
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadMatches()
  }, [])

  const loadMatches = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMatches()
      setMatches(data)
    } catch (err: any) {
      console.error('Failed to load matches:', err)
      setError(err.message || 'Failed to load matches')
    } finally {
      setLoading(false)
    }
  }

  // Filter matches by status
  const activeMatches = matches.filter(m => m.status === 'active')
  const upcomingMatches = matches.filter(m => m.status === 'upcoming')
  const resolvedMatches = matches.filter(m => m.status === 'resolved')

  // Calculate odds for matches
  const matchesWithOdds = matches.map(match => ({
    ...match,
    odds: {
      teamA: match.poolA > 0 ? match.totalPool / match.poolA : 1,
      teamB: match.poolB > 0 ? match.totalPool / match.poolB : 1,
    },
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <>
          <StatsOverview matches={matches} />

          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Soccer Matches</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive">{error}</p>
              </div>
            )}

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading matches...</p>
                  </div>
                ) : activeMatches.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No active matches at the moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeMatches.map((match) => {
                      const matchWithOdds = matchesWithOdds.find(m => m.id === match.id) || match
                      return <MatchCard key={match.id} match={{ ...matchWithOdds, startTime: match.startTime instanceof Date ? match.startTime : new Date(match.startTime) }} />
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading matches...</p>
                  </div>
                ) : upcomingMatches.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No upcoming matches at the moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingMatches.map((match) => {
                      const matchWithOdds = matchesWithOdds.find(m => m.id === match.id) || match
                      return <MatchCard key={match.id} match={{ ...matchWithOdds, startTime: match.startTime instanceof Date ? match.startTime : new Date(match.startTime) }} />
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resolved" className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading matches...</p>
                  </div>
                ) : resolvedMatches.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No resolved matches yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resolvedMatches.map((match) => {
                      const matchWithOdds = matchesWithOdds.find(m => m.id === match.id) || match
                      return <MatchCard key={match.id} match={{ ...matchWithOdds, startTime: match.startTime instanceof Date ? match.startTime : new Date(match.startTime) }} />
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </>
      </main>
    </div>
  )
}
