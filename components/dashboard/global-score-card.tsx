import { Trophy, TrendingUp } from "lucide-react"

export function GlobalScoreCard() {
  return (
    <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-white/80 text-sm mb-1">Your Global Score</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-bold">847</h2>
            <span className="text-white/80">/1000</span>
          </div>
        </div>
        <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
          <Trophy className="size-6" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <TrendingUp className="size-4" />
        <span>+23 points this week</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: "84.7%" }} />
        </div>
        <p className="text-xs text-white/70 mt-2">Top 15% of all developers</p>
      </div>
    </div>
  )
}
