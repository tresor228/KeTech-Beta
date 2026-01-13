import { DashboardHeader } from "@/components/company/company-header"
import { TopCandidates } from "@/components/company/top-candidates"

export default function CompanyCandidatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
          <p className="text-gray-600">Explore candidates who have completed your evaluations</p>
        </div>

        <TopCandidates />
      </main>
    </div>
  )
}
