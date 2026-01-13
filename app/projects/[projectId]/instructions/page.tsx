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
  "api-rest-nodejs": {
    objectives: [
      "Créer une API REST complète avec Node.js et Express",
      "Implémenter l'authentification JWT",
      "Ajouter la validation des données d'entrée",
      "Créer un système de gestion des erreurs robuste",
    ],
    requirements: [
      "Utiliser Express.js comme framework",
      "Implémenter les routes CRUD complètes",
      "Ajouter la validation avec Joi ou express-validator",
      "Sécuriser les routes avec JWT",
    ],
    tips: [
      "Organisez votre code en routes, contrôleurs et middlewares",
      "Testez votre API avec Postman ou Thunder Client",
      "Gérez les erreurs de manière cohérente",
    ],
  },
  "ecommerce-nextjs": {
    objectives: [
      "Construire une boutique en ligne moderne avec Next.js",
      "Implémenter un panier d'achat fonctionnel",
      "Créer un système de gestion des produits",
      "Ajouter une page de paiement (simulation)",
    ],
    requirements: [
      "Utiliser Next.js avec App Router",
      "Implémenter le state management (Context API ou Zustand)",
      "Créer des pages dynamiques pour les produits",
      "Ajouter la persistance du panier (localStorage)",
    ],
    tips: [
      "Planifiez la structure de vos données produits",
      "Utilisez les Server Components quand possible",
      "Testez le flux complet d'achat",
    ],
  },
  "dashboard-analytics": {
    objectives: [
      "Créer un tableau de bord interactif avec des graphiques",
      "Implémenter des visualisations de données en temps réel",
      "Ajouter des filtres et des options de personnalisation",
      "Créer une interface responsive et moderne",
    ],
    requirements: [
      "Utiliser une bibliothèque de graphiques (Chart.js, Recharts)",
      "Implémenter des composants de visualisation réutilisables",
      "Gérer les données avec des hooks personnalisés",
      "Ajouter des animations et transitions fluides",
    ],
    tips: [
      "Choisissez le bon type de graphique pour chaque donnée",
      "Optimisez les performances pour les grandes quantités de données",
      "Testez sur différents appareils",
    ],
  },
  "chat-app-realtime": {
    objectives: [
      "Développer une application de messagerie en temps réel",
      "Implémenter la communication WebSocket",
      "Créer des groupes de chat et des notifications",
      "Ajouter l'historique des messages",
    ],
    requirements: [
      "Utiliser Socket.io pour les WebSockets",
      "Implémenter l'authentification des utilisateurs",
      "Créer une interface utilisateur intuitive",
      "Gérer les états de connexion et déconnexion",
    ],
    tips: [
      "Testez la connexion et déconnexion des utilisateurs",
      "Gérez les cas d'erreur réseau",
      "Optimisez les performances pour de nombreux utilisateurs",
    ],
  },
  "blog-cms": {
    objectives: [
      "Créer un CMS simple pour gérer des articles de blog",
      "Implémenter l'authentification et l'autorisation",
      "Ajouter un éditeur de texte riche",
      "Créer des pages publiques et d'administration",
    ],
    requirements: [
      "Utiliser Next.js avec Prisma ORM",
      "Implémenter l'authentification avec NextAuth",
      "Créer un système de rôles (admin, éditeur)",
      "Ajouter la gestion des images",
    ],
    tips: [
      "Sécurisez bien les routes d'administration",
      "Optimisez les requêtes à la base de données",
      "Testez tous les rôles utilisateurs",
    ],
  },
}

export default function ProjectInstructionsPage({ params }: { params: { projectId: string } }) {
  // Mock KYC status - En production, cela viendrait d'un contexte utilisateur ou d'une API
  const kycStatus: KYCStatus = "verified"
  
  const project = PROJECTS_DATA[params.projectId] || PROJECTS_DATA["todo-app-react"]
  const instructions = PROJECT_INSTRUCTIONS[params.projectId] || PROJECT_INSTRUCTIONS["todo-app-react"]

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

          {/* Project Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Clock className="size-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{project.duration}</p>
              <p className="text-sm text-muted-foreground">Durée estimée</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Trophy className="size-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{project.points}</p>
              <p className="text-sm text-muted-foreground">Points</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Star className="size-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{project.rating}</p>
              <p className="text-sm text-muted-foreground">Note moyenne</p>
            </div>
          </div>

          {/* Difficulty and Technologies */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-sm text-muted-foreground mr-2">Difficulté:</span>
              <Badge className={DIFFICULTY_COLORS[project.difficulty as keyof typeof DIFFICULTY_COLORS]}>
                {project.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Technologies:</span>
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Instructions du projet</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="size-5 text-primary" />
                  Objectifs du projet
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {instructions.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <FileCode className="size-5 text-primary" />
                  Exigences techniques
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {instructions.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Code className="size-5 text-primary" />
                  Conseils pratiques
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {instructions.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Environment Info */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-3">Environnement de développement</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Écrivez votre code dans l'éditeur intégré</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Testez votre code en utilisant le terminal intégré</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Votre code est automatiquement sauvegardé</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Vous pouvez revenir sur votre projet à tout moment</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link href="/projects">
              <Button variant="outline">Retour aux projets</Button>
            </Link>
            <Link href={`/projects/${params.projectId}/ide`}>
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

