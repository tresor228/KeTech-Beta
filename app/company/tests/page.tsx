import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { TestCodesTable } from "@/components/company/test-codes-table"
import { Plus } from "lucide-react"

export default function CompanyTestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tests & Assessments</h1>
              <p className="text-muted-foreground">Manage your technical evaluations</p>
            </div>
            <Link href="/company/tests/create">
              <Button className="gap-2">
                <Plus className="size-4" />
                Create Test
              </Button>
            </Link>
          </div>

          <TestCodesTable />
        </div>
      </main>
    </div>
  )
}
