"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

export function BetaCountdown() {
  const COUNTDOWN_END_DATE = new Date("2026-01-31T00:00:00")

  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    hasStarted: boolean
    hasEnded: boolean
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = COUNTDOWN_END_DATE.getTime() - now.getTime()

      if (diff <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasStarted: true,
          hasEnded: true,
        }
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        hasStarted: true,
        hasEnded: false,
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  return (
    <Card className="inline-block px-6 py-4 bg-primary/5 border-primary/20">
      <div className="flex items-center gap-3">
        <Clock className="size-5 text-primary" />
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </div>
          <div className="text-primary text-xl">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-primary text-xl">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground">Minutes</div>
          </div>
          <div className="text-primary text-xl">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground">Seconds</div>
          </div>
        </div>
      </div>

      <p className="text-sm text-center mt-2 text-muted-foreground font-medium">
        Launching in
      </p>
    </Card>
  )
}
