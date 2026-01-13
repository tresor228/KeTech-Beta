import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

const RECOMMENDATIONS = [
  {
    title: "Complete JavaScript Advanced Test",
    description: "Based on your recent performance, this test will help you improve your score",
    difficulty: "Intermediate",
    estimatedTime: "45 min",
    points: "+50 pts",
    href: "/tests/js-advanced",
  },
  {
    title: "Join the React Hackathon",
    description: "Perfect match for your skills. Registration closes in 3 days",
    difficulty: "Advanced",
    estimatedTime: "2 days",
    points: "+200 pts",
    href: "/hackathons/react-2024",
  },
  {
    title: "TypeScript Fundamentals",
    description: "Strengthen your TypeScript knowledge with this curated test",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    points: "+30 pts",
    href: "/tests/ts-fundamentals",
  },
]

export function AIRecommendations() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="size-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold">AI Recommendations</h2>
      </div>

      <div className="space-y-4">
        {RECOMMENDATIONS.map((rec) => (
          <div key={rec.title} className="border border-border rounded-xl p-4 hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold mb-1">{rec.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-muted rounded">{rec.difficulty}</span>
                  <span>{rec.estimatedTime}</span>
                  <span className="text-primary font-medium">{rec.points}</span>
                </div>
              </div>
              <Link href={rec.href}>
                <Button size="sm" variant="ghost">
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
