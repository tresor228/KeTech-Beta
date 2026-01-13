import Link from "next/link"
import { Trophy } from "lucide-react"

const TOP_CANDIDATES = [
  { id: "1", name: "Alex Chen", score: 96, rank: 1 },
  { id: "2", name: "Sarah Johnson", score: 94, rank: 2 },
  { id: "3", name: "Michael Osei", score: 92, rank: 3 },
]

export function TopCandidates() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="size-5 text-primary" />
        <h2 className="text-xl font-bold">Top Performers</h2>
      </div>

      <div className="space-y-4">
        {TOP_CANDIDATES.map((candidate) => (
          <Link
            key={candidate.rank}
            href={`/company/reports/${candidate.id}`}
            className="flex items-center gap-3 rounded-xl px-2 -mx-2 py-2 hover:bg-muted/60 transition-colors"
          >
            <div
              className={`size-10 rounded-full flex items-center justify-center font-bold ${
                candidate.rank === 1
                  ? "bg-primary text-white"
                  : candidate.rank === 2
                    ? "bg-gray-400 text-white"
                    : "bg-amber-600 text-white"
              }`}
            >
              {candidate.rank}
            </div>
            <div className="flex-1">
              <p className="font-medium hover:underline">{candidate.name}</p>
              <p className="text-sm text-muted-foreground">Voir le profil · Score: {candidate.score}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
