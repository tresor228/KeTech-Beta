"use client"

import { TerminalIcon } from "lucide-react"

export function Terminal() {
  return (
    <div className="h-full flex flex-col bg-card">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/50">
        <TerminalIcon className="size-4 text-primary" />
        <span className="text-sm font-medium">Terminal</span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
        <div className="space-y-1">
          <div className="text-muted-foreground">
            <span className="text-primary">$</span> npm test
          </div>
          <div className="text-muted-foreground">Running tests...</div>
          <div className="text-green-600">✓ All tests passed (3/3)</div>
          <div className="text-muted-foreground mt-2">
            <span className="text-primary">$</span> <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
