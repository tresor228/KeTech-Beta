"use client"

interface InterestsStepProps {
  selected: string[]
  onChange: (interests: string[]) => void
}

const INTERESTS = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Blockchain",
  "Game Development",
  "UI/UX Design",
]

export function InterestsStep({ selected, onChange }: InterestsStepProps) {
  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      onChange(selected.filter((i) => i !== interest))
    } else {
      onChange([...selected, interest])
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">What are your interests?</h2>
        <p className="text-muted-foreground">Select all that apply</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selected.includes(interest)
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`size-5 rounded-md border-2 flex items-center justify-center ${
                  selected.includes(interest) ? "bg-primary border-primary" : "border-border"
                }`}
              >
                {selected.includes(interest) && (
                  <svg className="size-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-medium">{interest}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
