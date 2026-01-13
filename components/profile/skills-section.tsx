const SKILLS = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "Python", level: 70 },
  { name: "Docker", level: 65 },
]

export function SkillsSection() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>

      <div className="space-y-4">
        {SKILLS.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
