"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Archive, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { companySessionService } from "@/lib/company-session"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type JobStatus = "draft" | "published" | "closed" | "archived"

interface Job {
  id: string
  title: string
  description: string
  status: JobStatus
  applicationsCount: number
  keysRequired: number
  createdAt: string
  publishedAt?: string
}

export default function CompanyJobsPage() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all")

  // Simuler la vérification d'accès
  useEffect(() => {
    const checkAccess = async () => {
      // TODO: Récupérer l'ID de l'entreprise depuis la session
      const companyId = "mock-company-id"
      const access = await companySessionService.hasJobSessionAccess(companyId)
      setHasAccess(access)
      
      // Si l'accès est activé, charger les jobs
      if (access) {
        // TODO: Charger les jobs depuis l'API
        setJobs([
          // Mock data
          {
            id: "1",
            title: "Développeur React Senior",
            description: "Nous recherchons un développeur React expérimenté...",
            status: "published",
            applicationsCount: 15,
            keysRequired: 5,
            createdAt: "2024-01-15",
            publishedAt: "2024-01-15",
          },
        ])
      }
    }
    checkAccess()
  }, [])

  const getStatusBadge = (status: JobStatus) => {
    const variants: Record<JobStatus, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "outline",
      published: "default",
      closed: "secondary",
      archived: "outline",
    }
    
    const labels: Record<JobStatus, string> = {
      draft: "Brouillon",
      published: "Publié",
      closed: "Fermé",
      archived: "Archivé",
    }

    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Si l'accès n'est pas encore vérifié
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-background">
        <CompanyHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </main>
      </div>
    )
  }

  // Si l'entreprise n'a pas accès à la session d'emploi
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <CompanyHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mt-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Session d'emploi non activée</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-4">
                  Vous devez activer votre session d'emploi pour créer et gérer des offres d'emploi sur KeTech.
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  La session d'emploi permet aux entreprises de publier des offres et de recruter les meilleurs développeurs.
                </p>
                <Button asChild>
                  <Link href="/company/jobs/activate">
                    Activer la session d'emploi
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* En-tête */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Offres d'emploi</h1>
              <p className="text-muted-foreground">Créez et gérez vos offres d'emploi</p>
            </div>
            <Button asChild>
              <Link href="/company/jobs/create">
                <Plus className="size-4 mr-2" />
                Créer une offre
              </Link>
            </Button>
          </div>

          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle>Rechercher et filtrer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par titre ou description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as JobStatus | "all")}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="size-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="closed">Fermé</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Liste des offres */}
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Aucune offre d'emploi trouvée</p>
                <Button asChild>
                  <Link href="/company/jobs/create">
                    <Plus className="size-4 mr-2" />
                    Créer votre première offre
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          {getStatusBadge(job.status)}
                        </div>
                        <CardDescription className="line-clamp-2">{job.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>{job.applicationsCount} candidature(s)</span>
                        <span>{job.keysRequired} Keys requis</span>
                        <span>Créé le {new Date(job.createdAt).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/company/jobs/${job.id}`}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/company/jobs/${job.id}/edit`}>
                            <Edit className="size-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
