"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Clock, Trophy, TrendingUp, Filter, Search, Star } from "lucide-react"
import { VerifiedBadge } from "@/components/ui/verified-badge"

type KYCStatus = "not_verified" | "in_review" | "verified"

const AVAILABLE_PROJECTS = [
  {
    id: "todo-app-react",
    title: "Application Todo avec React",
    description: "Créez une application de gestion de tâches complète avec React, incluant l'ajout, la modification, la suppression et le filtrage des tâches.",
    difficulty: "Débutant",
    difficultyLevel: 1,
    duration: "2-3 heures",
    points: 50,
    technologies: ["React", "JavaScript", "CSS"],
    category: "Frontend",
    rating: 4.5,
    completions: 120,
  },
  {
    id: "api-rest-nodejs",
    title: "API REST avec Node.js",
    description: "Développez une API REST complète avec Node.js et Express, incluant l'authentification JWT, la validation des données et la gestion des erreurs.",
    difficulty: "Intermédiaire",
    difficultyLevel: 2,
    duration: "4-5 heures",
    points: 100,
    technologies: ["Node.js", "Express", "MongoDB"],
    category: "Backend",
    rating: 4.8,
    completions: 85,
  },
  {
    id: "ecommerce-nextjs",
    title: "Boutique E-commerce avec Next.js",
    description: "Construisez une boutique en ligne moderne avec Next.js, incluant un panier d'achat, le paiement et la gestion des produits.",
    difficulty: "Avancé",
    difficultyLevel: 3,
    duration: "6-8 heures",
    points: 150,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Fullstack",
    rating: 4.9,
    completions: 45,
  },
  {
    id: "dashboard-analytics",
    title: "Tableau de bord Analytics",
    description: "Créez un tableau de bord interactif avec des graphiques et des visualisations de données en temps réel.",
    difficulty: "Intermédiaire",
    difficultyLevel: 2,
    duration: "5-6 heures",
    points: 120,
    technologies: ["React", "Chart.js", "TypeScript"],
    category: "Frontend",
    rating: 4.6,
    completions: 95,
  },
  {
    id: "chat-app-realtime",
    title: "Application de chat en temps réel",
    description: "Développez une application de messagerie en temps réel avec WebSockets, incluant les notifications et les groupes.",
    difficulty: "Avancé",
    difficultyLevel: 3,
    duration: "7-9 heures",
    points: 180,
    technologies: ["Socket.io", "Node.js", "React"],
    category: "Fullstack",
    rating: 4.7,
    completions: 32,
  },
  {
    id: "blog-cms",
    title: "Système de gestion de contenu (CMS)",
    description: "Créez un CMS simple pour gérer des articles de blog avec authentification et éditeur de texte riche.",
    difficulty: "Intermédiaire",
    difficultyLevel: 2,
    duration: "4-5 heures",
    points: 110,
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    category: "Fullstack",
    rating: 4.5,
    completions: 78,
  },
]

const DIFFICULTY_COLORS = {
  Débutant: "bg-green-100 text-green-700 border-green-200",
  Intermédiaire: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Avancé: "bg-red-100 text-red-700 border-red-200",
}

export default function ProjectsPage() {
  // Mock KYC status - En production, cela viendrait d'un contexte utilisateur ou d'une API
  const [kycStatus] = useState<KYCStatus>("verified") // "not_verified" | "in_review" | "verified"
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popular")

  const filteredProjects = AVAILABLE_PROJECTS.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.completions - a.completions
      case "rating":
        return b.rating - a.rating
      case "difficulty":
        return a.difficultyLevel - b.difficultyLevel
      case "points":
        return b.points - a.points
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Projets Pratiques</h1>
              {kycStatus === "verified" && <VerifiedBadge size="lg" showLabel />}
            </div>
            <p className="text-muted-foreground">
              Travaillez sur des projets concrets et améliorez vos compétences avec notre éditeur intégré
            </p>
            {kycStatus === "verified" && (
              <p className="text-sm text-primary mt-2 flex items-center gap-1">
                <VerifiedBadge size="sm" />
                <span>Votre compte est vérifié - Vos projets sont marqués comme vérifiés</span>
              </p>
            )}
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Difficulty Filter */}
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="size-4 mr-2" />
                  <SelectValue placeholder="Difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les difficultés</SelectItem>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Fullstack">Fullstack</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Plus populaires</SelectItem>
                  <SelectItem value="rating">Meilleure note</SelectItem>
                  <SelectItem value="difficulty">Plus facile</SelectItem>
                  <SelectItem value="points">Plus de points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Projects Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Projets disponibles ({sortedProjects.length})
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code className="size-6 text-primary" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        className={`text-xs ${DIFFICULTY_COLORS[project.difficulty as keyof typeof DIFFICULTY_COLORS]}`}
                      >
                        {project.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span>{project.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                    {kycStatus === "verified" && (
                      <VerifiedBadge size="sm" className="flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="size-4" />
                      <span>{project.points} pts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-4" />
                      <span>{project.completions} complétions</span>
                    </div>
                  </div>

                  <Link href={`/projects/${project.id}/instructions`}>
                    <Button className="w-full">Commencer le projet</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {sortedProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun projet trouvé avec ces critères.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

