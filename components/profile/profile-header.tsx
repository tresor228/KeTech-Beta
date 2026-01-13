import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, Calendar } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="size-24 rounded-2xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
          JD
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <CheckCircle className="size-6 text-primary" />
          </div>
          <p className="text-muted-foreground mb-4">Full-Stack Developer</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>Joined Jan 2024</span>
            </div>
          </div>

          <Button>Edit Profile</Button>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">847</p>
            <p className="text-sm text-muted-foreground">Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Tests</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">#847</p>
            <p className="text-sm text-muted-foreground">Rank</p>
          </div>
        </div>
      </div>
    </div>
  )
}
