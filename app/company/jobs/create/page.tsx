"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Briefcase, MapPin, DollarSign, Users, Code, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { companySessionService } from "@/lib/company-session"
import { DEFAULT_JOB_APPLICATION_COST } from "@/lib/keys"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CreateJobPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contractType: "",
    workType: "",
    location: "",
    remote: false,
    experienceLevel: "",
    requiredSkills: [] as string[],
    salaryMin: "",
    salaryMax: "",
    currency: "FCFA",
    salaryNegotiable: false,
    benefits: "",
    responsibilities: "",
    requirements: "",
    keysRequired: DEFAULT_JOB_APPLICATION_COST.toString(),
    maxApplications: "",
    deadline: "",
    status: "draft" as "draft" | "published",
  })

  // Vérifier l'accès à la session d'emploi
  useEffect(() => {
    const checkAccess = async () => {
      const companyId = "mock-company-id"
      const access = await companySessionService.hasJobSessionAccess(companyId)
      setHasAccess(access)
    }
    checkAccess()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Appel API réel pour créer l'offre
    // Vérifier que hasAccess est true avant de soumettre
    if (!hasAccess) {
      return
    }
    
    // Mock creation - redirect to jobs list
    router.push("/company/jobs")
  }

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

  // Si l'entreprise n'a pas accès
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
                  Vous devez activer votre session d'emploi pour créer des offres d'emploi.
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
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/company/jobs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux offres d'emploi
          </Link>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Créer une offre d'emploi</h1>
            <p className="text-muted-foreground">
              Publiez une offre d'emploi pour recruter les meilleurs développeurs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations de base */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Informations de base</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du poste *</Label>
                  <Input
                    id="title"
                    placeholder="Développeur React Senior"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description de l'offre *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le poste, les missions et l'environnement de travail..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contractType">Type de contrat *</Label>
                    <Select
                      value={formData.contractType}
                      onValueChange={(value) => setFormData({ ...formData, contractType: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cdi">CDI</SelectItem>
                        <SelectItem value="cdd">CDD</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="stage">Stage</SelectItem>
                        <SelectItem value="alternance">Alternance</SelectItem>
                        <SelectItem value="contrat">Contrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workType">Type de travail *</Label>
                    <Select
                      value={formData.workType}
                      onValueChange={(value) => setFormData({ ...formData, workType: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Temps plein</SelectItem>
                        <SelectItem value="part-time">Temps partiel</SelectItem>
                        <SelectItem value="projet">Projet</SelectItem>
                        <SelectItem value="remote">Télétravail</SelectItem>
                        <SelectItem value="hybrid">Hybride</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      placeholder="Dakar, Sénégal"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Niveau d'expérience requis *</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Rémunération */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Rémunération</h2>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Salaire minimum</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      placeholder="500000"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">Salaire maximum</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      placeholder="800000"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FCFA">FCFA</SelectItem>
                        <SelectItem value="XOF">XOF</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Avantages et bénéfices</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Assurance santé, tickets restaurant, télétravail..."
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Exigences et compétences */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Code className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Exigences et compétences</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="requiredSkills">Compétences requises (séparées par des virgules)</Label>
                  <Input
                    id="requiredSkills"
                    placeholder="React, TypeScript, Node.js, MongoDB"
                    value={formData.requiredSkills.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requiredSkills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Exigences détaillées *</Label>
                  <Textarea
                    id="requirements"
                    placeholder="• Maîtrise de React et TypeScript&#10;• Expérience avec les APIs REST&#10;• Connaissance de Git"
                    rows={5}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Utilisez des puces (•) pour séparer les exigences</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsabilités et missions</Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="• Développer des applications web modernes&#10;• Participer aux réunions d'équipe&#10;• Code review et mentorat"
                    rows={5}
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Paramètres de candidature */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Users className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Paramètres de candidature</h2>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="keysRequired">
                      Nombre de Keys requis pour postuler * (1-10)
                    </Label>
                    <Input
                      id="keysRequired"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.keysRequired}
                      onChange={(e) => setFormData({ ...formData, keysRequired: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Chaque développeur doit utiliser ce nombre de Keys pour postuler à cette offre
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxApplications">Nombre maximum de candidatures (optionnel)</Label>
                    <Input
                      id="maxApplications"
                      type="number"
                      placeholder="Illimité"
                      value={formData.maxApplications}
                      onChange={(e) => setFormData({ ...formData, maxApplications: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Date limite de candidature (optionnel)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Publication */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Publication</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut de publication</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as "draft" | "published" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publier immédiatement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Link href="/company/jobs">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" size="lg">
                {formData.status === "published" ? "Publier l'offre" : "Enregistrer comme brouillon"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
