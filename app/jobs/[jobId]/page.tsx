"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Key, Users, Calendar, Building2 } from "lucide-react"
import { keysService, INITIAL_FREE_KEYS } from "@/lib/keys"
import { DashboardHeader } from "@/components/dashboard/header"

interface Job {
  id: string
  title: string
  description: string
  company: string
  companyLogo?: string
  location: string
  contractType: string
  workType: string
  salaryMin?: number
  salaryMax?: number
  currency: string
  experienceLevel: string
  keysRequired: number
  applicationsCount: number
  publishedAt: string
  deadline?: string
  skills: string[]
  requirements: string[]
  responsibilities: string[]
  benefits?: string
}

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = params.jobId as string
  const [job, setJob] = useState<Job | null>(null)
  const [keysBalance, setKeysBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

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
        description:
          "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe dynamique. Vous serez responsable du développement d'applications web modernes et performantes.",
        company: "TechCorp",
        location: "Dakar, Sénégal",
        contractType: "CDI",
        workType: "Temps plein",
        salaryMin: 500000,
        salaryMax: 800000,
        currency: "FCFA",
        experienceLevel: "Senior",
        keysRequired: 5,
        applicationsCount: 15,
        publishedAt: "2024-01-15",
        skills: ["React", "TypeScript", "Node.js", "MongoDB", "Git"],
        requirements: [
          "Maîtrise de React et TypeScript",
          "Expérience avec les APIs REST",
          "Connaissance de Git et workflows collaboratifs",
          "Minimum 3 ans d'expérience en développement web",
        ],
        responsibilities: [
          "Développer des applications web modernes",
          "Participer aux réunions d'équipe",
          "Code review et mentorat des juniors",
          "Optimiser les performances des applications",
        ],
        benefits: "Assurance santé, tickets restaurant, télétravail partiel",
      })

      setLoading(false)
    }
    loadData()
  }, [jobId])

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

  const formatSalary = (min?: number, max?: number, currency: string) => {
    if (!min && !max) return "Salaire non spécifié"
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`
    if (min) return `À partir de ${min.toLocaleString()} ${currency}`
    if (max) return `Jusqu'à ${max.toLocaleString()} ${currency}`
    return "Salaire non spécifié"
  }

  const canApply = keysBalance !== null && keysBalance >= job.keysRequired

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux offres
          </Link>

          {/* En-tête de l'offre */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold">{job.title}</h1>
                    <Badge>{job.experienceLevel}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      {job.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-4" />
                      {job.contractType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {job.workType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-4" />
                      {job.applicationsCount} candidature(s)
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      Publié le {new Date(job.publishedAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="flex items-center gap-1 mb-2 justify-end">
                    <Key className="size-4" />
                    {job.keysRequired} Keys requis
                  </Badge>
                  {keysBalance !== null && (
                    <p className="text-sm text-muted-foreground">Votre solde : {keysBalance} Keys</p>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          {/* Informations clés */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rémunération</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-5 text-primary" />
                  <span className="text-lg font-semibold">
                    {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                  </span>
                </div>
                {job.benefits && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Avantages :</p>
                    <p className="text-sm text-muted-foreground">{job.benefits}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compétences requises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Responsabilités */}
          {job.responsibilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Responsabilités et missions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Exigences */}
          {job.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Exigences</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Prêt à postuler ?</p>
                  <p className="text-sm text-muted-foreground">
                    Cette candidature nécessite {job.keysRequired} Keys de votre solde
                  </p>
                </div>
                <div className="flex gap-3">
                  {!canApply && (
                    <Button variant="outline" asChild>
                      <Link href="/keys/purchase">Acheter des Keys</Link>
                    </Button>
                  )}
                  <Button
                    size="lg"
                    disabled={!canApply}
                    asChild
                  >
                    <Link href={`/jobs/${jobId}/apply`}>
                      Postuler maintenant ({job.keysRequired} Keys)
                    </Link>
                  </Button>
                </div>
              </div>
              {!canApply && keysBalance !== null && (
                <p className="text-sm text-destructive mt-3">
                  Solde insuffisant. Il vous faut {job.keysRequired - keysBalance} Keys supplémentaires.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
