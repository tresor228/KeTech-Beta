import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Users, Trophy, Clock, Code2 } from "lucide-react"

const HACKATHONS = [
  {
    id: "react-challenge-2024",
    title: "React Challenge 2024",
    description: "Build a complete React application in 48 hours",
    status: "upcoming",
    startDate: "Jan 15, 2024",
    duration: "48 hours",
    participants: 234,
    prize: "$5,000",
    difficulty: "Advanced",
  },
  {
    id: "web-dev-sprint",
    title: "Web Dev Sprint",
    description: "Create a responsive landing page with modern CSS",
    status: "active",
    startDate: "Jan 10, 2024",
    duration: "24 hours",
    participants: 456,
    prize: "$2,000",
    difficulty: "Intermediate",
  },
  {
    id: "js-algorithm-challenge",
    title: "JavaScript Algorithm Challenge",
    description: "Solve complex algorithms and data structure problems",
    status: "upcoming",
    startDate: "Jan 20, 2024",
    duration: "12 hours",
    participants: 189,
    prize: "$1,000",
    difficulty: "Expert",
  },
]

export default function HackathonsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Hackathons</h1>
            <p className="text-muted-foreground">Compete with developers across Africa and win prizes</p>
          </div>

          {/* Join with Code */}
          <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">Have a hackathon code?</h2>
            <p className="text-white/80 mb-4">Enter your invitation code to join</p>
            <div className="flex gap-3 max-w-md">
              <Input
                placeholder="Enter hackathon code"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button variant="secondary">Join</Button>
            </div>
          </div>

          {/* Active Hackathons */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Active & Upcoming</h2>
            <div className="space-y-6">
              {HACKATHONS.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Code2 className="size-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{hackathon.title}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              hackathon.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-primary"
                            }`}
                          >
                            {hackathon.status === "active" ? "Active Now" : "Upcoming"}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{hackathon.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="size-4" />
                          <span>{hackathon.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="size-4" />
                          <span>{hackathon.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="size-4" />
                          <span>{hackathon.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <Trophy className="size-4" />
                          <span>{hackathon.prize} prize</span>
                        </div>
                        <span className="px-2 py-1 bg-muted rounded text-xs">{hackathon.difficulty}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link href={`/hackathons/${hackathon.id}`}>
                        <Button>View Details</Button>
                      </Link>
                      {hackathon.status === "active" && (
                        <Link href={`/hackathons/${hackathon.id}/leaderboard`}>
                          <Button variant="outline" className="w-full bg-transparent">
                            Leaderboard
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Hackathons */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">My Hackathons</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div>
                  <p className="font-medium">Web Dev Sprint</p>
                  <p className="text-sm text-muted-foreground">Currently participating</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">#23</p>
                  <p className="text-xs text-muted-foreground">Your rank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
