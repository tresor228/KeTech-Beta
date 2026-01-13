import { Users, FileCheck, TrendingUp, Clock } from "lucide-react"

const STATS = [
  {
    label: "Total Candidates",
    value: "342",
    change: "+12%",
    icon: Users,
  },
  {
    label: "Active Tests",
    value: "8",
    change: "+2",
    icon: FileCheck,
  },
  {
    label: "Completion Rate",
    value: "87%",
    change: "+5%",
    icon: TrendingUp,
  },
  {
    label: "Avg. Time",
    value: "42m",
    change: "-3m",
    icon: Clock,
  },
]

export function StatsOverview() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="size-5 text-primary" />
            </div>
            <span className="text-xs text-green-600 font-medium">{stat.change}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
