import { Trophy, Medal } from "lucide-react"

const LEADERBOARD_DATA = [
  { rank: 1, user: "Alex Chen", score: 987, time: "12h 34m", submissions: 3 },
  { rank: 2, user: "Sarah Johnson", score: 945, time: "14h 12m", submissions: 5 },
  { rank: 3, user: "Michael Osei", score: 923, time: "15h 45m", submissions: 4 },
  { rank: 4, user: "Fatima Ahmed", score: 892, time: "16h 23m", submissions: 6 },
  { rank: 5, user: "David Mutua", score: 876, time: "17h 08m", submissions: 3 },
  { rank: 6, user: "Amina Bakare", score: 854, time: "18h 34m", submissions: 7 },
  { rank: 7, user: "James Okafor", score: 843, time: "19h 12m", submissions: 4 },
  { rank: 8, user: "Zainab Hassan", score: 821, time: "20h 45m", submissions: 5 },
  { rank: 9, user: "Kevin Mwangi", score: 809, time: "21h 23m", submissions: 6 },
  { rank: 10, user: "Chioma Eze", score: 798, time: "22h 08m", submissions: 4 },
]

export function LeaderboardTable() {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 text-primary" />
          <h2 className="text-xl font-bold">Rankings</h2>
        </div>
      </div>

      {/* Top 3 Highlight */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="space-y-4">
          {LEADERBOARD_DATA.slice(0, 3).map((entry) => (
            <div key={entry.rank} className="flex items-center gap-4 p-4 bg-card border-2 border-primary/30 rounded-xl">
              {/* Rank Badge */}
              <div
                className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  entry.rank === 1
                    ? "bg-primary text-white"
                    : entry.rank === 2
                      ? "bg-gray-400 text-white"
                      : "bg-amber-600 text-white"
                }`}
              >
                {entry.rank === 1 ? <Trophy className="size-6" /> : entry.rank}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-lg">{entry.user}</p>
                  {entry.rank <= 3 && <Medal className="size-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {entry.submissions} submissions • {entry.time}
                </p>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{entry.score}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-sm font-semibold">Rank</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Developer</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Score</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Time</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Submissions</th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD_DATA.slice(3).map((entry) => (
              <tr key={entry.rank} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {entry.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium">{entry.user}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-lg font-bold text-primary">{entry.score}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm text-muted-foreground">{entry.time}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm text-muted-foreground">{entry.submissions}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
