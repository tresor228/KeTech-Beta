import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, FileText } from "lucide-react"

const CANDIDATES = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@example.com",
    score: 96,
    timeSpent: "38m",
    submittedAt: "2024-01-11 14:23",
    status: "completed",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    score: 94,
    timeSpent: "42m",
    submittedAt: "2024-01-11 15:45",
    status: "completed",
  },
  {
    id: "3",
    name: "Michael Osei",
    email: "michael@example.com",
    score: 92,
    timeSpent: "45m",
    submittedAt: "2024-01-11 16:12",
    status: "completed",
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    email: "fatima@example.com",
    score: 87,
    timeSpent: "51m",
    submittedAt: "2024-01-12 09:34",
    status: "completed",
  },
  {
    id: "5",
    name: "David Mutua",
    email: "david@example.com",
    score: null,
    timeSpent: "23m",
    submittedAt: null,
    status: "in-progress",
  },
]

export function CandidatesTable() {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <h2 className="text-xl font-bold">Candidate Results</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-sm font-semibold">Candidate</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Score</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Time Spent</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Submitted</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CANDIDATES.map((candidate) => (
              <tr key={candidate.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/company/reports/${candidate.id}`} className="block">
                    <div>
                      <p className="font-medium hover:underline">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">Voir le profil · {candidate.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center">
                  {candidate.score ? (
                    <span className="text-2xl font-bold text-primary">{candidate.score}%</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-muted-foreground">{candidate.timeSpent}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm text-muted-foreground">{candidate.submittedAt || "Not submitted"}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      candidate.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-primary"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {candidate.status === "completed" && (
                      <>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <Eye className="size-4" />
                          View Code
                        </Button>
                        <Link href={`/company/reports/${candidate.id}`}>
                          <Button size="sm" className="gap-2">
                            <FileText className="size-4" />
                            AI Report
                          </Button>
                        </Link>
                      </>
                    )}
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
