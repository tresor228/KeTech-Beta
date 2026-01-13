"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Key, AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react"
import { keysService, INITIAL_FREE_KEYS, DEFAULT_JOB_APPLICATION_COST } from "@/lib/keys"
import { DashboardHeader } from "@/components/dashboard/header"
import { Separator } from "@/components/ui/separator"

interface Job {
  id: string
  title: string
  company: string
  keysRequired: number
}

export default function ApplyJobPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string
  const [job, setJob] = useState<Job | null>(null)
  const [keysBalance, setKeysBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    coverLetter: "",
    cvUrl: "",
    portfolioUrl: "",
  })

  useEffect(() => {
    const loadData = async () => {
      // TODO: Charger les détails de l'offre depuis l'API
      // TODO: Charger le solde de Keys depuis l'API
      const userId = "mock-user-id"
      const userKeys = await keysService.getUserKeys(userId)
      setKeysBalance(userKeys?.balance ?? INITIAL_FREE_KEYS)

      // Mock data
      setJob({
        id: jobId,
        title: "Développeur React Senior",
        company: "TechCorp",
        keysRequired: 5,
      })

      setLoading(false)
    }
    loadData()
  }, [jobId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    if (!job || keysBalance === null) {
      setError("Erreur lors du chargement des données")
      setSubmitting(false)
      return
    }

    if (keysBalance < job.keysRequired) {
      setError(`Solde insuffisant. Il vous faut ${job.keysRequired - keysBalance} Keys supplémentaires.`)
      setSubmitting(false)
      return
    }

    try {
      // TODO: Appel API réel pour soumettre la candidature
      const result = await keysService.useKeysForJobApplication(
        "mock-user-id",
        jobId,
        job.keysRequired
      )

      if (!result.success) {
        setError(result.error || "Erreur lors de la soumission de la candidature")
        setSubmitting(false)
        return
      }

      // Mise à jour du solde localement
      if (result.newBalance !== undefined) {
        setKeysBalance(result.newBalance)
      }

      // Rediriger vers la page de confirmation
      router.push(`/jobs/${jobId}/apply/success?transactionId=${result.transactionId}`)
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Chargement...</p>
        </main>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Offre non trouvée</p>
        </main>
      </div>
    )
  }

  const canApply = keysBalance !== null && keysBalance >= job.keysRequired

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link
            href={`/jobs/${jobId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux détails de l'offre
          </Link>

          <div className="space-y-6">
            {/* Résumé */}
            <Card>
              <CardHeader>
                <CardTitle>Postuler à cette offre</CardTitle>
                <CardDescription>
                  {job.title} chez {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Key className="size-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Coût de la candidature</p>
                      <p className="text-2xl font-bold text-primary">{job.keysRequired} Keys</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Votre solde</p>
                    <p className={`text-xl font-semibold ${canApply ? "text-foreground" : "text-destructive"}`}>
                      {keysBalance !== null ? `${keysBalance} Keys` : "..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerte solde insuffisant */}
            {!canApply && keysBalance !== null && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Solde insuffisant</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="mb-2">
                    Vous n'avez pas assez de Keys pour postuler à cette offre.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/keys/purchase">Acheter des Keys</Link>
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Formulaire de candidature */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de candidature</CardTitle>
                  <CardDescription>
                    Votre profil KeTech sera automatiquement attaché à votre candidature
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">
                      Lettre de motivation <span className="text-muted-foreground">(optionnelle)</span>
                    </Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                      rows={8}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Une lettre de motivation personnalisée augmente vos chances d'être sélectionné
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="cvUrl">Lien vers votre CV</Label>
                    <Input
                      id="cvUrl"
                      type="url"
                      placeholder="https://example.com/cv.pdf"
                      value={formData.cvUrl}
                      onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl">Lien vers votre portfolio</Label>
                    <Input
                      id="portfolioUrl"
                      type="url"
                      placeholder="https://example.com/portfolio"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Récapitulatif et confirmation */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <span className="text-sm font-medium">Coût total</span>
                    <span className="text-lg font-bold text-primary">{job.keysRequired} Keys</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>Votre profil KeTech sera automatiquement attaché</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>Votre score global sera visible par l'entreprise</span>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="flex-1"
                      disabled={submitting}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={!canApply || submitting}
                      className="flex-1"
                      size="lg"
                    >
                      {submitting ? (
                        "Traitement..."
                      ) : (
                        <>
                          Confirmer et postuler ({job.keysRequired} Keys)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
