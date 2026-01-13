"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Zap } from "lucide-react"
import { companySessionService } from "@/lib/company-session"

export default function ActivateJobSessionPage() {
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)

  const handleActivate = async () => {
    setIsActivating(true)
    // TODO: Appel API réel pour activer la session
    const companyId = "mock-company-id"
    const success = await companySessionService.activateJobSession(companyId)
    
    if (success) {
      // Rediriger vers la page des jobs
      router.push("/company/jobs")
    } else {
      // Gérer l'erreur
      setIsActivating(false)
    }
  }

  const features = [
    "Publier des offres d'emploi illimitées",
    "Recevoir des candidatures de développeurs qualifiés",
    "Gérer votre pipeline de recrutement",
    "Accéder aux profils complets des candidats",
    "Voir les scores techniques des candidats",
    "Communiquer directement avec les candidats",
  ]

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link
            href="/company/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour au dashboard
          </Link>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="size-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Activer la Session d'Emploi</CardTitle>
                  <CardDescription>
                    Débloquez toutes les fonctionnalités de recrutement sur KeTech
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Avec la Session d'Emploi, vous pourrez :</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Note importante</h3>
                <p className="text-sm text-muted-foreground">
                  L'activation de la session d'emploi peut être soumise à une souscription. 
                  Contactez notre équipe pour plus d'informations sur les tarifs et plans disponibles.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleActivate}
                  disabled={isActivating}
                  size="lg"
                  className="flex-1"
                >
                  {isActivating ? "Activation en cours..." : "Activer la session d'emploi"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  size="lg"
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
