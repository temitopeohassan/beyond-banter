"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Zap } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Total Volume Staked",
      value: "$2.4M",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Active Users",
      value: "12,543",
      change: "+8.2%",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Active Matches",
      value: "24",
      change: "+3",
      icon: Zap,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
