"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock, Key } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { keysService, INITIAL_FREE_KEYS } from "@/lib/keys"
import { DashboardHeader } from "@/components/dashboard/header"

interface Job {
  id: string
  title: string
  description: string
  company: string
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
  skills: string[]
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [keysBalance, setKeysBalance] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [contractFilter, setContractFilter] = useState<string>("all")
  const [experienceFilter, setExperienceFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      // TODO: Charger le solde de Keys depuis l'API
      const userId = "mock-user-id"
      const userKeys = await keysService.getUserKeys(userId)
      setKeysBalance(userKeys?.balance ?? INITIAL_FREE_KEYS)

      // TODO: Charger les offres depuis l'API
      // Mock data
      setJobs([
        {
          id: "1",
          title: "Développeur React Senior",
          description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe...",
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
          skills: ["React", "TypeScript", "Node.js"],
        },
        {
          id: "2",
          title: "Développeur Full Stack",
          description: "Opportunité pour un développeur full stack passionné...",
          company: "StartupTech",
          location: "Abidjan, Côte d'Ivoire",
          contractType: "CDI",
          workType: "Hybride",
          salaryMin: 600000,
          salaryMax: 900000,
          currency: "FCFA",
          experienceLevel: "Intermédiaire",
          keysRequired: 3,
          applicationsCount: 8,
          publishedAt: "2024-01-14",
          skills: ["React", "Node.js", "MongoDB"],
        },
      ])
    }
    loadData()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesContract = contractFilter === "all" || job.contractType.toLowerCase() === contractFilter.toLowerCase()
    const matchesExperience =
      experienceFilter === "all" || job.experienceLevel.toLowerCase() === experienceFilter.toLowerCase()
    const matchesLocation =
      locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase())

    return matchesSearch && matchesContract && matchesExperience && matchesLocation
  })

  const formatSalary = (min?: number, max?: number, currency: string) => {
    if (!min && !max) return "Salaire non spécifié"
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`
    if (min) return `À partir de ${min.toLocaleString()} ${currency}`
    if (max) return `Jusqu'à ${max.toLocaleString()} ${currency}`
    return "Salaire non spécifié"
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* En-tête avec solde de Keys */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Offres d'emploi</h1>
              <p className="text-muted-foreground">Trouvez l'opportunité parfaite pour votre carrière</p>
            </div>
            {keysBalance !== null && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Key className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Votre solde</p>
                      <p className="text-2xl font-bold text-primary">{keysBalance} Keys</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle>Rechercher et filtrer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par titre, entreprise ou description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Select value={contractFilter} onValueChange={setContractFilter}>
                    <SelectTrigger>
                      <Filter className="size-4 mr-2" />
                      <SelectValue placeholder="Type de contrat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les contrats</SelectItem>
                      <SelectItem value="cdi">CDI</SelectItem>
                      <SelectItem value="cdd">CDD</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="stage">Stage</SelectItem>
                      <SelectItem value="alternance">Alternance</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Niveau d'expérience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les niveaux</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Localisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les localisations</SelectItem>
                      <SelectItem value="dakar">Dakar</SelectItem>
                      <SelectItem value="abidjan">Abidjan</SelectItem>
                      <SelectItem value="remote">Télétravail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des offres */}
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Aucune offre d'emploi trouvée</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <Badge variant="outline">{job.experienceLevel}</Badge>
                        </div>
                        <CardDescription className="text-base font-medium text-foreground mb-1">
                          {job.company}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="size-4" />
                            {job.contractType}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {job.workType}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Key className="size-3" />
                          {job.keysRequired} Keys
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="size-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{job.applicationsCount} candidature(s)</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline">+{job.skills.length - 3}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/jobs/${job.id}`}>Voir les détails</Link>
                      </Button>
                      <Button
                        asChild
                        disabled={keysBalance !== null && keysBalance < job.keysRequired}
                      >
                        <Link href={`/jobs/${job.id}/apply`}>
                          Postuler ({job.keysRequired} Keys)
                        </Link>
                      </Button>
                    </div>
                    {keysBalance !== null && keysBalance < job.keysRequired && (
                      <p className="text-xs text-destructive mt-2 text-right">
                        Solde insuffisant. Vous avez besoin de {job.keysRequired} Keys.
                      </p>
                    )}
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
