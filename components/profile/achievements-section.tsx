import { Trophy, Award, Target, Zap } from "lucide-react"

const ACHIEVEMENTS = [
  {
    title: "JavaScript Expert",
    description: "Scored 95+ on JavaScript Advanced Test",
    icon: Trophy,
    date: "Dec 2024",
  },
  {
    title: "Fast Learner",
    description: "Completed 5 tests in one week",
    icon: Zap,
    date: "Dec 2024",
  },
  {
    title: "Hackathon Winner",
    description: "1st place in React Challenge 2024",
    icon: Award,
    date: "Nov 2024",
  },
  {
    title: "Goal Achiever",
    description: "Reached 800+ global score",
    icon: Target,
    date: "Nov 2024",
  },
]

export function AchievementsSection() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Achievements</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((achievement) => (
          <div key={achievement.title} className="border border-border rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <achievement.icon className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
