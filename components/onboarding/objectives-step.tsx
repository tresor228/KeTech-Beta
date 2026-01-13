"use client"

interface ObjectivesStepProps {
  selected: string[]
  onChange: (objectives: string[]) => void
}

const OBJECTIVES = [
  {
    id: "job",
    title: "Find a Job",
    description: "Connect with companies hiring developers",
  },
  {
    id: "skills",
    title: "Improve Skills",
    description: "Learn and practice through challenges",
  },
  {
    id: "certification",
    title: "Get Certified",
    description: "Earn verified skill certifications",
  },
  {
    id: "network",
    title: "Build Network",
    description: "Connect with other developers",
  },
  {
    id: "hackathons",
    title: "Join Hackathons",
    description: "Compete in coding competitions",
  },
  {
    id: "portfolio",
    title: "Build Portfolio",
    description: "Showcase your technical abilities",
  },
]

export function ObjectivesStep({ selected, onChange }: ObjectivesStepProps) {
  const toggleObjective = (objective: string) => {
    if (selected.includes(objective)) {
      onChange(selected.filter((o) => o !== objective))
    } else {
      onChange([...selected, objective])
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">What are your goals?</h2>
        <p className="text-muted-foreground">Select all that apply</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {OBJECTIVES.map((objective) => (
          <button
            key={objective.id}
            onClick={() => toggleObjective(objective.id)}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              selected.includes(objective.id)
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`size-5 rounded-md border-2 flex items-center justify-center mt-0.5 ${
                  selected.includes(objective.id) ? "bg-primary border-primary" : "border-border"
                }`}
              >
                {selected.includes(objective.id) && (
                  <svg className="size-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold mb-1">{objective.title}</h3>
                <p className="text-sm text-muted-foreground">{objective.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
