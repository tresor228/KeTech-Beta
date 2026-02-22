'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { Clock, FileCode, CheckCircle, Code, Trophy, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VerifiedBadge } from "@/components/ui/verified-badge"

type KYCStatus = "not_verified" | "in_review" | "verified"

const PROJECTS_DATA: Record<
  string,
  {
    title: string
    duration: string
    points: number
    difficulty: string
    technologies: string[]
    rating: number
    completions: number
  }
> = {
  "todo-app-react": {
    title: "Application Todo avec React",
    duration: "2-3 heures",
    points: 50,
    difficulty: "Débutant",
    technologies: ["React", "JavaScript", "CSS"],
    rating: 4.5,
    completions: 120,
  },
  "api-rest-nodejs": {
    title: "API REST avec Node.js",
    duration: "4-5 heures",
    points: 100,
    difficulty: "Intermédiaire",
    technologies: ["Node.js", "Express", "MongoDB"],
    rating: 4.8,
    completions: 85,
  },
  "ecommerce-nextjs": {
    title: "Boutique E-commerce avec Next.js",
    duration: "6-8 heures",
    points: 150,
    difficulty: "Avancé",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    rating: 4.9,
    completions: 45,
  },
  "dashboard-analytics": {
    title: "Tableau de bord Analytics",
    duration: "5-6 heures",
    points: 120,
    difficulty: "Intermédiaire",
    technologies: ["React", "Chart.js", "TypeScript"],
    rating: 4.6,
    completions: 95,
  },
  "chat-app-realtime": {
    title: "Application de chat en temps réel",
    duration: "7-9 heures",
    points: 180,
    difficulty: "Avancé",
    technologies: ["Socket.io", "Node.js", "React"],
    rating: 4.7,
    completions: 32,
  },
  "blog-cms": {
    title: "Système de gestion de contenu (CMS)",
    duration: "4-5 heures",
    points: 110,
    difficulty: "Intermédiaire",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    rating: 4.5,
    completions: 78,
  },
}

const PROJECT_INSTRUCTIONS: Record<string, { objectives: string[]; requirements: string[]; tips: string[] }> = {
  "todo-app-react": {
    objectives: [
      "Créer une interface utilisateur intuitive pour gérer les tâches",
      "Implémenter l'ajout, la modification et la suppression de tâches",
      "Ajouter un système de filtrage (toutes, actives, complétées)",
      "Permettre de marquer les tâches comme complétées",
    ],
    requirements: [
      "Utiliser React avec des hooks (useState, useEffect)",
      "Créer des composants réutilisables",
      "Gérer l'état local de l'application",
      "Ajouter des styles CSS modernes",
    ],
    tips: [
      "Commencez par créer la structure de base avec useState",
      "Pensez à la structure des données avant de coder",
      "Testez chaque fonctionnalité au fur et à mesure",
    ],
  },
  // ... (le reste des instructions est inchangé)
}

// La fonction est maintenant ASYNC pour attendre les `params`
export default async function ProjectInstructionsPage({ params }: { params: { projectId: string } }) {
  const kycStatus: KYCStatus = "verified"
  
  // On accède à projectId de manière sécurisée
  const projectId = params.projectId || "todo-app-react";
  const project = PROJECTS_DATA[projectId] || PROJECTS_DATA["todo-app-react"];
  const instructions = PROJECT_INSTRUCTIONS[projectId] || PROJECT_INSTRUCTIONS["todo-app-react"];

  const DIFFICULTY_COLORS = {
    Débutant: "bg-green-100 text-green-700 border-green-200",
    Intermédiaire: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Avancé: "bg-red-100 text-red-700 border-red-200",
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              {kycStatus === "verified" && <VerifiedBadge size="lg" showLabel />}
            </div>
            <p className="text-muted-foreground">Lisez attentivement les instructions avant de commencer</p>
          </div>

          {/* ... (le reste de la page est inchangé) */}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link href="/projects">
              <Button variant="outline">Retour aux projets</Button>
            </Link>
            {/* Le lien utilise maintenant le projectId résolu */}
            <Link href={`/projects/${projectId}/ide`}>
              <Button size="lg" className="min-w-40">
                Commencer le projet
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
