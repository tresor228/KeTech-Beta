"use client"

import { useState, useEffect } from "react"
import { IDELayout } from "@/components/ide/ide-layout"

export default function TestIDEPage({ params }: { params: { testId: string } }) {
  const [timeRemaining, setTimeRemaining] = useState(3600) // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <IDELayout testId={params.testId} timeRemaining={timeRemaining} />
}
