"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Key, ArrowRight, FileText } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/header"
import { KeysBalanceCard } from "@/components/keys/keys-balance-card"

export default function ApplyJobSuccessPage() {
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("transactionId")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Message de succès */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="size-8 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl mb-2">Candidature envoyée avec succès !</CardTitle>
              <CardDescription className="text-base">
                Votre candidature a été soumise avec succès. L'entreprise recevra une notification et pourra consulter votre profil.
              </CardDescription>
              {transactionId && (
                <p className="text-sm text-muted-foreground mt-2">
                  Transaction ID : {transactionId}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Solde actuel */}
          <KeysBalanceCard />

          {/* Prochaines étapes */}
          <Card>
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">L'entreprise examinera votre candidature</p>
                  <p className="text-sm text-muted-foreground">
                    Vous recevrez une notification lorsqu'elle consultera votre profil
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Suivez l'état de votre candidature</p>
                  <p className="text-sm text-muted-foreground">
                    Consultez vos candidatures dans la section "Mes candidatures"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Continuez à postuler</p>
                  <p className="text-sm text-muted-foreground">
                    Utilisez vos Keys pour postuler à d'autres offres d'emploi intéressantes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/jobs">
                <ArrowRight className="size-4 mr-2" />
                Voir d'autres offres
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/jobs/applications">
                <FileText className="size-4 mr-2" />
                Mes candidatures
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
