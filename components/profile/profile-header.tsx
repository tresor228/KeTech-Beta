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
          <div className="flex items-center gap-2 mb-4">
            <p className="text-muted-foreground">Full-Stack Developer</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 border border-amber-200 dark:border-amber-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
              Ambassadeur
            </span>
          </div>

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
