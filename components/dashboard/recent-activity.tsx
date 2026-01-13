import { CheckCircle, TrendingUp, Award } from "lucide-react"

const ACTIVITIES = [
  {
    type: "test",
    title: "Completed React Test",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-primary",
  },
  {
    type: "achievement",
    title: "Rank increased to #847",
    time: "1 day ago",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    type: "badge",
    title: "Earned JavaScript Expert badge",
    time: "3 days ago",
    icon: Award,
    color: "text-primary",
  },
]

export function RecentActivity() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

      <div className="space-y-4">
        {ACTIVITIES.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <activity.icon className={`size-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
