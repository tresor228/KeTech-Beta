import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Clock } from "lucide-react"

const RECENT_TESTS = [
  {
    id: "1",
    name: "Senior React Developer",
    code: "ABC-123",
    candidates: 23,
    duration: "60 min",
    created: "2 days ago",
  },
  {
    id: "2",
    name: "JavaScript Fundamentals",
    code: "XYZ-789",
    candidates: 45,
    duration: "45 min",
    created: "1 week ago",
  },
  {
    id: "3",
    name: "Full-Stack Assessment",
    code: "DEF-456",
    candidates: 18,
    duration: "90 min",
    created: "2 weeks ago",
  },
]

export function RecentTests() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Tests</h2>
        <Link href="/company/tests">
          <Button variant="ghost" size="sm">
            View all
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {RECENT_TESTS.map((test) => (
          <Link key={test.id} href={`/company/tests/${test.id}`}>
            <div className="p-4 border border-border rounded-xl hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{test.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded font-mono">{test.code}</span>
                    <div className="flex items-center gap-1">
                      <Users className="size-3" />
                      <span>{test.candidates} candidates</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{test.duration}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{test.created}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
