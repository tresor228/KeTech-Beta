import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy, Eye, Users } from "lucide-react"

const TEST_CODES = [
  {
    id: "1",
    code: "ABC-123-XYZ",
    testName: "Senior React Developer",
    candidates: 23,
    completed: 18,
    avgScore: 87,
    created: "2024-01-10",
    status: "active",
  },
  {
    id: "2",
    code: "XYZ-789-ABC",
    testName: "JavaScript Fundamentals",
    candidates: 45,
    completed: 42,
    avgScore: 92,
    created: "2024-01-08",
    status: "active",
  },
  {
    id: "3",
    code: "DEF-456-GHI",
    testName: "Full-Stack Assessment",
    candidates: 18,
    completed: 15,
    avgScore: 78,
    created: "2024-01-05",
    status: "completed",
  },
]

export function TestCodesTable() {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <h2 className="text-xl font-bold">Test Codes</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-sm font-semibold">Test Code</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Test Name</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Candidates</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Completed</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Avg Score</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {TEST_CODES.map((test) => (
              <tr key={test.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="font-mono font-bold text-primary">{test.code}</code>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium">{test.testName}</p>
                  <p className="text-xs text-muted-foreground">{test.created}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="size-4 text-muted-foreground" />
                    <span>{test.candidates}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{test.completed}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-primary font-bold">{test.avgScore}%</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      test.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {test.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/company/candidates/${test.id}`}>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <Eye className="size-4" />
                        View Results
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
