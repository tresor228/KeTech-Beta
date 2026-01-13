import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { Clock, FileCode, AlertCircle, CheckCircle } from "lucide-react"

export default function TestInstructionsPage({ params }: { params: { testId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">JavaScript Advanced Test</h1>
            <p className="text-muted-foreground">Read the instructions carefully before starting</p>
          </div>

          {/* Test Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Clock className="size-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">60 min</p>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <FileCode className="size-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <CheckCircle className="size-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">100</p>
              <p className="text-sm text-muted-foreground">Points</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Instructions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Before you begin:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ensure you have a stable internet connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>The timer will start immediately when you begin the test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>You cannot pause or restart the test once started</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Your code will be automatically saved every 30 seconds</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Test Environment:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Write your code in the provided IDE interface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Test your code using the integrated terminal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Submit your solution when you're ready</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Evaluation Criteria:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Code correctness and functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Code quality and best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Performance and optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Time management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900 mb-1">Important</p>
              <p className="text-sm text-amber-800">
                Once you start the test, the timer cannot be paused. Make sure you have enough time to complete it.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link href="/tests">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Link href={`/tests/${params.testId}/ide`}>
              <Button size="lg" className="min-w-40">
                Start Test
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
