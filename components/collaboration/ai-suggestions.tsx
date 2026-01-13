import { Sparkles, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AICallaborationSuggestions() {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <div className="flex items-center gap-2 text-blue-700">
          <Sparkles className="h-5 w-5" />
          <CardTitle className="text-lg">AI Suggestions</CardTitle>
        </div>
        <CardDescription>Based on your recent tests and interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-white p-3 shadow-sm border border-blue-100">
          <p className="text-sm font-medium">Potential Hackathon Team</p>
          <p className="mt-1 text-xs text-muted-foreground">
            You, Fatou (Flutter), and Koffi (Backend) would make a balanced team for the "FinTech Africa" hackathon.
          </p>
          <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-blue-600">
            Form Team <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="rounded-lg bg-white p-3 shadow-sm border border-blue-100">
          <p className="text-sm font-medium">Skill Exchange</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Moussa Diop is looking to learn Go, which you recently mastered. You could exchange Go tips for his React
            expertise.
          </p>
          <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-blue-600">
            Contact Moussa <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
