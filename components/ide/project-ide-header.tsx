"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KeTechLogo } from "@/components/ketech-logo"
import { Save, Download } from "lucide-react"
import { VerifiedBadge } from "@/components/ui/verified-badge"

type KYCStatus = "not_verified" | "in_review" | "verified"

interface ProjectIDEHeaderProps {
  onSave: () => void
  onDownload?: () => void
  kycStatus?: KYCStatus
}

export function ProjectIDEHeader({ onSave, onDownload, kycStatus = "not_verified" }: ProjectIDEHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/projects">
            <KeTechLogo className="scale-90" />
          </Link>
          {kycStatus === "verified" && (
            <VerifiedBadge size="md" showLabel className="ml-2" />
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Auto-save indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Save className="size-4" />
            <span>Sauvegarde automatique activée</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {onDownload && (
              <Button onClick={onDownload} variant="outline" size="lg" className="gap-2">
                <Download className="size-4" />
                Télécharger
              </Button>
            )}
            <Button onClick={onSave} size="lg" className="gap-2">
              <Save className="size-4" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

