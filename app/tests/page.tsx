import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code, Clock, Trophy, TrendingUp } from "lucide-react"

const AVAILABLE_TESTS = [
  {
    id: "js-advanced",
    title: "JavaScript Advanced",
    description: "Test your advanced JavaScript knowledge",
    difficulty: "Advanced",
    duration: "60 min",
    points: 100,
    questions: 15,
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Core React concepts and patterns",
    difficulty: "Intermediate",
    duration: "45 min",
    points: 75,
    questions: 12,
  },
  {
    id: "ts-basics",
    title: "TypeScript Basics",
    description: "Introduction to TypeScript",
    difficulty: "Beginner",
    duration: "30 min",
    points: 50,
    questions: 10,
  },
]

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Technical Tests</h1>
            <p className="text-muted-foreground">Challenge yourself and improve your global score</p>
          </div>

          {/* Enter Test Code */}
          <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">Have a test code?</h2>
            <p className="text-white/80 mb-4">Enter your unique test code to start</p>
            <div className="flex gap-3 max-w-md">
              <Input
                placeholder="Enter test code"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Link href="/tests/enter-code">
                <Button variant="secondary">Start Test</Button>
              </Link>
            </div>
          </div>

          {/* Available Tests */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Tests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVAILABLE_TESTS.map((test) => (
                <div
                  key={test.id}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code className="size-6 text-primary" />
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted rounded">{test.difficulty}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{test.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="size-4" />
                      <span>{test.points} pts</span>
                    </div>
                  </div>

                  <Link href={`/tests/${test.id}/instructions`}>
                    <Button className="w-full">Start Test</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Recent Results</h2>
            <div className="space-y-3">
              {[
                { test: "React Fundamentals", score: 87, date: "2 days ago" },
                { test: "JavaScript Basics", score: 92, date: "1 week ago" },
                { test: "CSS Advanced", score: 78, date: "2 weeks ago" },
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{result.test}</p>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{result.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
