import { UserDiscovery } from "@/components/collaboration/user-discovery"
import { AICallaborationSuggestions } from "@/components/collaboration/ai-suggestions"
import { DashboardHeader } from "@/components/dashboard/header"

export default function CollaborationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <DashboardHeader />
      <main className="container mx-auto flex-1 space-y-8 p-4 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collaboration</h1>
            <p className="text-muted-foreground">Find developers, collaborate on projects, and grow together.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UserDiscovery />
          </div>
          <div className="space-y-6">
            <AICallaborationSuggestions />
          </div>
        </div>
      </main>
    </div>
  )
}
