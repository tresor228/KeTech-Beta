import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Shield } from "lucide-react"

type KYCStatus = "not_verified" | "in_review" | "verified"

export function KYCStatusCard() {
  const status: KYCStatus = "in_review" // Mock status

  const statusConfig = {
    not_verified: {
      icon: AlertCircle,
      iconColor: "text-muted-foreground",
      bgColor: "bg-muted",
      title: "Not Verified",
      description: "Complete KYC verification to unlock all features",
      action: "Start Verification",
    },
    in_review: {
      icon: Shield,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      title: "In Review",
      description: "Your documents are being reviewed",
      action: "View Status",
    },
    verified: {
      icon: CheckCircle,
      iconColor: "text-primary",
      bgColor: "bg-primary",
      title: "Verified",
      description: "Your account is fully verified",
      action: "View Certificate",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">KYC Status</p>
          <h3 className="text-2xl font-bold">{config.title}</h3>
        </div>
        <div className={`size-12 rounded-full ${config.bgColor} flex items-center justify-center`}>
          <Icon className={`size-6 ${(status as string) === "verified" ? "text-white" : config.iconColor}`} />
        </div>
      </div>

      <p className="text-muted-foreground mb-6">{config.description}</p>

      <Button asChild variant={(status as string) === "verified" ? "outline" : "default"} className="w-full">
        <Link href="/profile#kyc">
          {config.action}
        </Link>
      </Button>
    </div>
  )
}
