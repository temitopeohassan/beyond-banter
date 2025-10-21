"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: Briefcase,
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
  {
    href: "/profile",
    label: "Account",
    icon: User,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

