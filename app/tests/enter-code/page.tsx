"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EnterTestCodePage() {
  const router = useRouter()
  const [code, setCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock validation - redirect to instructions
    router.push("/tests/mock-test/instructions")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to tests
          </Link>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-2">Enter Test Code</h1>
            <p className="text-muted-foreground mb-6">Enter the unique code provided by your evaluator</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="testCode">Test Code</Label>
                <Input
                  id="testCode"
                  placeholder="ABC-123-XYZ"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                  className="text-center text-lg font-mono"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={code.length < 5}>
                Continue
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
