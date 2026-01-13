import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { CandidatesTable } from "@/components/company/candidates-table"
import { ArrowLeft, Download } from "lucide-react"

export default function CandidatesResultsPage({ params }: { params: { testId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Link
            href="/company/tests"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to tests
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Senior React Developer - Results</h1>
              <p className="text-muted-foreground">Test Code: ABC-123-XYZ</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="size-4" />
              Export Results
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Candidates</p>
              <p className="text-3xl font-bold text-primary">23</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold text-primary">18</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg Score</p>
              <p className="text-3xl font-bold text-primary">87%</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg Time</p>
              <p className="text-3xl font-bold text-primary">42m</p>
            </div>
          </div>

          <CandidatesTable />
        </div>
      </main>
    </div>
  )
}
