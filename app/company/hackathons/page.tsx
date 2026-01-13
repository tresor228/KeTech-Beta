"use client"

import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Clock, Code2, Plus, Eye, MessageSquare } from "lucide-react"

const COMPANY_HACKATHONS = [
  {
    id: "react-challenge-2024",
    title: "React Challenge 2024",
    description: "Build a complete React application in 48 hours",
    status: "active",
    startDate: "Jan 15, 2024",
    endDate: "Jan 17, 2024",
    duration: "48 hours",
    participants: 234,
    prize: "$5,000",
    difficulty: "Advanced",
    topParticipants: 12,
  },
  {
    id: "fullstack-bootcamp",
    title: "Fullstack Bootcamp Challenge",
    description: "Create a full-stack application with authentication",
    status: "completed",
    startDate: "Dec 1, 2023",
    endDate: "Dec 3, 2023",
    duration: "48 hours",
    participants: 456,
    prize: "$3,000",
    difficulty: "Intermediate",
    topParticipants: 8,
  },
  {
    id: "ai-ml-hackathon",
    title: "AI/ML Innovation Hackathon",
    description: "Build AI-powered solutions for African markets",
    status: "upcoming",
    startDate: "Feb 1, 2024",
    endDate: "Feb 3, 2024",
    duration: "48 hours",
    participants: 0,
    prize: "$10,000",
    difficulty: "Expert",
    topParticipants: 0,
  },
]

export default function CompanyHackathonsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mes Hackathons</h1>
              <p className="text-muted-foreground">
                Organisez des hackathons pour trouver et recruter les meilleurs développeurs
              </p>
            </div>
            <Link href="/company/hackathons/create">
              <Button size="lg" className="gap-2">
                <Plus className="size-4" />
                Créer un hackathon
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Code2 className="size-5 text-primary" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Hackathons</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="size-5 text-primary" />
                <span className="text-2xl font-bold">690</span>
              </div>
              <p className="text-sm text-muted-foreground">Participants totaux</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="size-5 text-primary" />
                <span className="text-2xl font-bold">20</span>
              </div>
              <p className="text-sm text-muted-foreground">Talents contactés</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="size-5 text-primary" />
                <span className="text-2xl font-bold">15</span>
              </div>
              <p className="text-sm text-muted-foreground">Entretiens planifiés</p>
            </div>
          </div>

          {/* Hackathons List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Tous les hackathons</h2>
            <div className="space-y-6">
              {COMPANY_HACKATHONS.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Code2 className="size-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{hackathon.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={
                                hackathon.status === "active"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : hackathon.status === "completed"
                                    ? "bg-gray-100 text-gray-700 border-gray-200"
                                    : "bg-blue-100 text-primary border-blue-200"
                              }
                            >
                              {hackathon.status === "active"
                                ? "Actif"
                                : hackathon.status === "completed"
                                  ? "Terminé"
                                  : "À venir"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{hackathon.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="size-4" />
                          <span>
                            {hackathon.startDate} - {hackathon.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="size-4" />
                          <span>{hackathon.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="size-4" />
                          <span>{hackathon.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <Trophy className="size-4" />
                          <span>{hackathon.prize} prix</span>
                        </div>
                        {hackathon.status === "completed" && (
                          <div className="flex items-center gap-1 text-primary font-medium">
                            <Users className="size-4" />
                            <span>{hackathon.topParticipants} top participants identifiés</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link href={`/company/hackathons/${hackathon.id}`}>
                        <Button className="w-full">
                          <Eye className="size-4 mr-2" />
                          Gérer
                        </Button>
                      </Link>
                      {hackathon.status === "completed" && (
                        <Link href={`/company/hackathons/${hackathon.id}?tab=participants`}>
                          <Button variant="outline" className="w-full">
                            <MessageSquare className="size-4 mr-2" />
                            Contacter talents
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

