"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeTechLogo } from "@/components/ketech-logo"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to login
          </Link>
          <div className="flex justify-center mb-6">
            <KeTechLogo />
          </div>
          <h1 className="text-3xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground mt-2">
            {submitted ? "Check your email" : "Enter your email to receive a reset link"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mx-auto">
                <CheckCircle className="size-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link href="/login">
                <Button className="w-full">Back to login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send Reset Link
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
