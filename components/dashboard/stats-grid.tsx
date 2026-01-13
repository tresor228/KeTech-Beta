import { Code, Trophy, Users, Clock } from "lucide-react"

const STATS = [
  {
    label: "Tests Completed",
    value: "12",
    icon: Code,
    color: "text-primary",
  },
  {
    label: "Avg. Score",
    value: "87%",
    icon: Trophy,
    color: "text-primary",
  },
  {
    label: "Rank",
    value: "#847",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Total Time",
    value: "24h",
    icon: Clock,
    color: "text-primary",
  },
]

export function StatsGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`size-5 ${stat.color}`} />
          </div>
          <p className="text-3xl font-bold mb-1">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
