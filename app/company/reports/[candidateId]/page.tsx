import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Sparkles, TrendingUp, TrendingDown, CheckCircle, XCircle } from "lucide-react"

export default function AIReportPage({ params }: { params: { candidateId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/company/candidates/1"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to results
          </Link>

          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-6 text-primary" />
                <h1 className="text-3xl font-bold">AI Performance Report</h1>
              </div>
              <p className="text-muted-foreground">Candidate: Alex Chen</p>
              <p className="text-sm text-muted-foreground">Test: Senior React Developer</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="size-4" />
              Export PDF
            </Button>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8">
            <div className="text-center">
              <p className="text-white/80 mb-2">Overall Score</p>
              <p className="text-6xl font-bold mb-4">96%</p>
              <p className="text-white/80">Excellent Performance</p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Strong React Fundamentals</p>
                  <p className="text-sm text-green-800">
                    Demonstrated excellent understanding of React hooks, component lifecycle, and state management
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Clean Code Quality</p>
                  <p className="text-sm text-green-800">
                    Well-structured code with proper naming conventions and comments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <XCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900 mb-1">Performance Optimization</p>
                  <p className="text-sm text-amber-800">
                    Could improve by implementing useMemo and useCallback in specific areas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Skill Breakdown</h2>
            <div className="space-y-4">
              {[
                { skill: "React Knowledge", score: 98, trend: "up" },
                { skill: "Code Quality", score: 95, trend: "up" },
                { skill: "Problem Solving", score: 94, trend: "up" },
                { skill: "Performance", score: 92, trend: "neutral" },
                { skill: "Best Practices", score: 96, trend: "up" },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.skill}</span>
                      {item.trend === "up" && <TrendingUp className="size-4 text-green-600" />}
                      {item.trend === "down" && <TrendingDown className="size-4 text-red-600" />}
                    </div>
                    <span className="text-sm font-bold text-primary">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Hiring Recommendation</h2>
            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <Sparkles className="size-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-primary mb-2">Strongly Recommended</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Alex demonstrates exceptional React skills and coding practices. Their performance indicates they
                  would be an excellent fit for senior-level positions. The candidate shows strong problem-solving
                  abilities and writes maintainable, production-ready code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
