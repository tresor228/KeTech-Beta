"use client"

interface SkillLevelStepProps {
  selected: string
  onChange: (level: string) => void
}

const SKILL_LEVELS = [
  {
    id: "beginner",
    title: "Beginner",
    description: "Just starting my coding journey",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Comfortable with basic concepts",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Experienced developer",
  },
  {
    id: "expert",
    title: "Expert",
    description: "Senior-level expertise",
  },
]

export function SkillLevelStep({ selected, onChange }: SkillLevelStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">What's your skill level?</h2>
        <p className="text-muted-foreground">Help us personalize your experience</p>
      </div>

      <div className="grid gap-4">
        {SKILL_LEVELS.map((level) => (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              selected === level.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`size-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selected === level.id ? "bg-primary border-primary" : "border-border"
                }`}
              >
                {selected === level.id && <div className="size-2.5 rounded-full bg-primary-foreground" />}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{level.title}</h3>
                <p className="text-muted-foreground">{level.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
