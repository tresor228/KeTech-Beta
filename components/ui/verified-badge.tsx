"use client"

import { CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function VerifiedBadge({ size = "md", showLabel = false, className }: VerifiedBadgeProps) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  }

  const iconSize = sizeClasses[size]

  if (showLabel) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <CheckCircle className={`${iconSize} text-primary`} />
        <span className="text-xs font-medium text-primary">Vérifié</span>
      </div>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`inline-flex items-center justify-center ${className}`}>
          <CheckCircle className={`${iconSize} text-primary`} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Utilisateur vérifié KYC</p>
      </TooltipContent>
    </Tooltip>
  )
}

