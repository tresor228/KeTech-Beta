"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export default function CreateTestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    difficulty: "intermediate",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/company/tests")
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Link
            href="/company/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>

          <div>
            <h1 className="text-3xl font-bold mb-2">Create New Test</h1>
            <p className="text-muted-foreground">Set up a technical assessment for candidates</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Test Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Senior React Developer Assessment"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe what skills this test evaluates..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="60"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    className="w-full px-3 py-2 border border-border rounded-lg"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link href="/company/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Create Test</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
