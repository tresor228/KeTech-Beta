"use client"

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SubmitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testId: string
}

export function SubmitDialog({ open, onOpenChange, testId }: SubmitDialogProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = () => {
    // Mock submission - notify and redirect to dashboard
    toast({
      title: "Soumission réussie",
      description: "Notre IA analysera votre code et votre score sera disponible dans 24h à 48h.",
      duration: 5000,
    })

    setTimeout(() => {
      onOpenChange(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Test?</DialogTitle>
          <DialogDescription>
            Are you sure you want to submit your test? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            Make sure you've reviewed all your answers. You won't be able to make changes after submission.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue Editing
          </Button>
          <Button onClick={handleSubmit}>Submit Test</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
