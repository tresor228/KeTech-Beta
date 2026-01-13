import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, FileCode, Users, BarChart3 } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link href="/company/tests/create">
        <Button className="w-full h-24 flex-col gap-2" size="lg">
          <Plus className="size-6" />
          <span>Create Test</span>
        </Button>
      </Link>
      <Link href="/company/tests">
        <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-transparent" size="lg">
          <FileCode className="size-6" />
          <span>View Tests</span>
        </Button>
      </Link>
      <Link href="/company/candidates">
        <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-transparent" size="lg">
          <Users className="size-6" />
          <span>Candidates</span>
        </Button>
      </Link>
      <Link href="/company/reports">
        <Button variant="outline" className="w-full h-24 flex-col gap-2 bg-transparent" size="lg">
          <BarChart3 className="size-6" />
          <span>AI Reports</span>
        </Button>
      </Link>
    </div>
  )
}
