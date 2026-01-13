import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { LeaderboardTable } from "@/components/hackathon/leaderboard-table"
import { ArrowLeft, Trophy, Users, Clock } from "lucide-react"

export default function LeaderboardPage({ params }: { params: { hackathonId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Link
            href={`/hackathons/${params.hackathonId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to hackathon
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">React Challenge 2024 - Leaderboard</h1>
              <p className="text-muted-foreground">Live rankings updated every 5 minutes</p>
            </div>
            <Button variant="outline">
              <Trophy className="size-4 mr-2" />
              My Rank: #23
            </Button>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <Users className="size-5 text-primary mb-2" />
              <p className="text-3xl font-bold mb-1">456</p>
              <p className="text-sm text-muted-foreground">Total Participants</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Trophy className="size-5 text-primary mb-2" />
              <p className="text-3xl font-bold mb-1">127</p>
              <p className="text-sm text-muted-foreground">Submissions</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Clock className="size-5 text-primary mb-2" />
              <p className="text-3xl font-bold mb-1">18h 24m</p>
              <p className="text-sm text-muted-foreground">Time Remaining</p>
            </div>
          </div>

          {/* Leaderboard */}
          <LeaderboardTable />
        </div>
      </main>
    </div>
  )
}
