import { DashboardHeader } from "@/components/dashboard/header"
import { GlobalScoreCard } from "@/components/dashboard/global-score-card"
import { KYCStatusCard } from "@/components/dashboard/kyc-status-card"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { AIRecommendations } from "@/components/dashboard/ai-recommendations"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { KeysBalanceCard } from "@/components/keys/keys-balance-card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's what's happening with your account today</p>
          </div>

          {/* Top Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            <GlobalScoreCard />
            <KYCStatusCard />
            <KeysBalanceCard />
          </div>

          {/* Stats Grid */}
          <StatsGrid />

          {/* AI Recommendations & Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIRecommendations />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
