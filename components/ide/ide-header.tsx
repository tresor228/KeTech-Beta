"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KeTechLogo } from "@/components/ketech-logo"
import { Clock, Save, Send } from "lucide-react"

interface IDEHeaderProps {
  timeRemaining: number
  onSubmit: () => void
}

export function IDEHeader({ timeRemaining, onSubmit }: IDEHeaderProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLowTime = timeRemaining <= 300 // 5 minutes

  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <KeTechLogo className="scale-90" />
        </Link>

        <div className="flex items-center gap-4">
          {/* Auto-save indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Save className="size-4" />
            <span>Auto-saved</span>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
              isLowTime ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
            }`}
          >
            <Clock className="size-5" />
            <span>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>

          {/* Submit Button */}
          <Button onClick={onSubmit} size="lg" className="gap-2">
            <Send className="size-4" />
            Submit Test
          </Button>
        </div>
      </div>
    </header>
  )
}
