import { CompanyHeader } from "@/components/company/company-header"
import { StatsOverview } from "@/components/company/stats-overview"
import { RecentTests } from "@/components/company/recent-tests"
import { TopCandidates } from "@/components/company/top-candidates"
import { QuickActions } from "@/components/company/quick-actions"

export default function CompanyDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Acme Inc.</h1>
            <p className="text-muted-foreground">Here's an overview of your technical evaluations</p>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Stats Overview */}
          <StatsOverview />

          {/* Recent Tests & Top Candidates */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentTests />
            </div>
            <div>
              <TopCandidates />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
