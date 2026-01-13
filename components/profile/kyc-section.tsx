"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle, Shield, Upload, AlertCircle } from "lucide-react"

type KYCStatus = "not_verified" | "in_review" | "verified"

export function KYCSection() {
  const [status] = useState<KYCStatus>("in_review")
  const [idDocument, setIdDocument] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0])
    }
  }

  return (
    <div id="kyc" className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">KYC Verification</h2>

      {/* Status Badge */}
      <div className="mb-6">
        {status === "not_verified" && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="size-5" />
            <span className="font-medium">Not Verified</span>
          </div>
        )}
        {status === "in_review" && (
          <div className="flex items-center gap-2 text-primary">
            <Shield className="size-5" />
            <span className="font-medium">In Review</span>
          </div>
        )}
        {status === "verified" && (
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle className="size-5" />
            <span className="font-medium">Verified</span>
          </div>
        )}
      </div>

      {status === "not_verified" && (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Verify your identity to unlock all features and increase your credibility with potential employers.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idDocument">Upload ID Document</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <input
                  id="idDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <label htmlFor="idDocument" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (max 5MB)</p>
                    {idDocument && <p className="text-xs text-primary mt-2">Selected: {idDocument.name}</p>}
                  </div>
                </label>
              </div>
            </div>

            <Button className="w-full" disabled={!idDocument}>
              Submit for Review
            </Button>
          </div>
        </div>
      )}

      {status === "in_review" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Your documents are currently being reviewed. This usually takes 24-48 hours.
          </p>
          <div className="border border-border rounded-xl p-4 bg-muted/50">
            <p className="text-sm font-medium mb-1">Document Submitted</p>
            <p className="text-xs text-muted-foreground">ID_Document_2024.pdf</p>
          </div>
        </div>
      )}

      {status === "verified" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl">
            <CheckCircle className="size-5 text-primary" />
            <p className="text-sm font-medium text-primary">Your account is fully verified!</p>
          </div>
          <p className="text-muted-foreground">
            You now have access to all platform features and enhanced credibility with employers.
          </p>
        </div>
      )}
    </div>
  )
}
