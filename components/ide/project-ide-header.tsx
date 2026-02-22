"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KeTechLogo } from "@/components/ketech-logo"
import { Save, Download } from "lucide-react"
import { VerifiedBadge } from "@/components/ui/verified-badge"

type KYCStatus = "not_verified" | "in_review" | "verified"

interface ProjectIDEHeaderProps {
  onSave: () => void
  onSubmit: () => void
  onDownload?: () => void
  kycStatus?: KYCStatus
}

export function ProjectIDEHeader({ onSave, onSubmit, onDownload, kycStatus = "not_verified" }: ProjectIDEHeaderProps) {
  return (
    <header className="border-b border-[#2d2d2d] bg-[#18181A] px-4 py-2.5 text-zinc-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-bold text-white tracking-widest text-lg">KeTech<span className="text-blue-500">_</span></span>
          </Link>
          {kycStatus === "verified" && (
            <VerifiedBadge size="sm" showLabel className="ml-2" />
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Auto-save indicator */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-500">
            <Save className="size-3.5" />
            <span>Saved recently</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            {onDownload && (
              <Button onClick={onDownload} variant="ghost" size="sm" className="hidden md:flex gap-2 text-zinc-400 hover:text-white hover:bg-white/10 h-8 text-xs font-medium px-3">
                <Download className="size-3.5" />
                Download
              </Button>
            )}
            <Button onClick={onSave} variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white hover:bg-white/10 h-8 text-xs font-medium px-3">
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button onClick={onSubmit} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-0 h-8 text-xs font-semibold px-4 shadow-sm">
              Submit to AI
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

