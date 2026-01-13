"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, Trophy, Target } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateHackathonPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
    prize: "",
    difficulty: "",
    requirements: "",
    prizes: {
      first: "",
      second: "",
      third: "",
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock creation - redirect to hackathons list
    router.push("/company/hackathons")
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/company/hackathons"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux hackathons
          </Link>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Créer un nouveau hackathon</h1>
            <p className="text-muted-foreground">
              Organisez un hackathon pour découvrir et recruter les meilleurs développeurs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Informations générales</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du hackathon *</Label>
                  <Input
                    id="title"
                    placeholder="React Challenge 2024"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le hackathon, les objectifs et ce que vous recherchez..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début *</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée *</Label>
                    <Input
                      id="duration"
                      placeholder="48 heures"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulté *</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la difficulté" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Prizes */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Prix</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prize">Prix total *</Label>
                  <Input
                    id="prize"
                    placeholder="$5,000"
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstPrize">1er prix</Label>
                    <Input
                      id="firstPrize"
                      placeholder="$2,500"
                      value={formData.prizes.first}
                      onChange={(e) => setFormData({ ...formData, prizes: { ...formData.prizes, first: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondPrize">2ème prix</Label>
                    <Input
                      id="secondPrize"
                      placeholder="$1,500"
                      value={formData.prizes.second}
                      onChange={(e) => setFormData({ ...formData, prizes: { ...formData.prizes, second: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thirdPrize">3ème prix</Label>
                    <Input
                      id="thirdPrize"
                      placeholder="$1,000"
                      value={formData.prizes.third}
                      onChange={(e) => setFormData({ ...formData, prizes: { ...formData.prizes, third: e.target.value } })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Target className="size-6 text-primary" />
                <h2 className="text-2xl font-bold">Exigences du challenge</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Liste des exigences techniques *</Label>
                <Textarea
                  id="requirements"
                  placeholder="• Construire une application React complète&#10;• Implémenter la gestion d'état&#10;• Créer un design responsive&#10;• Gérer les erreurs et les états de chargement"
                  rows={6}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Utilisez des puces (•) pour séparer les exigences</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Link href="/company/hackathons">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" size="lg">
                Créer le hackathon
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

