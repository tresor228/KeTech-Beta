"use client"

import { useState } from "react"
import Link from "next/link"
import { CompanyHeader } from "@/components/company/company-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Calendar,
  Users,
  Trophy,
  Clock,
  Code2,
  MessageSquare,
  Mail,
  Briefcase,
  UserCheck,
  CheckCircle,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PARTICIPANTS = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    score: 987,
    rank: 1,
    time: "12h 34m",
    submissions: 3,
    status: "contacted",
    contactedAt: "2024-01-17",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    score: 945,
    rank: 2,
    time: "14h 12m",
    submissions: 5,
    status: "interview_scheduled",
    contactedAt: "2024-01-17",
  },
  {
    id: "3",
    name: "Michael Osei",
    email: "michael.osei@example.com",
    score: 923,
    rank: 3,
    time: "15h 45m",
    submissions: 4,
    status: "not_contacted",
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    email: "fatima.a@example.com",
    score: 892,
    rank: 4,
    time: "16h 23m",
    submissions: 6,
    status: "not_contacted",
  },
  {
    id: "5",
    name: "David Mutua",
    email: "david.m@example.com",
    score: 876,
    rank: 5,
    time: "17h 08m",
    submissions: 3,
    status: "not_contacted",
  },
]

export default function CompanyHackathonDetailsPage({ params }: { params: { hackathonId: string } }) {
  const [selectedParticipant, setSelectedParticipant] = useState<typeof PARTICIPANTS[0] | null>(null)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [contactType, setContactType] = useState<"job" | "interview">("job")
  const [message, setMessage] = useState("")

  const handleContact = (participant: typeof PARTICIPANTS[0], type: "job" | "interview") => {
    setSelectedParticipant(participant)
    setContactType(type)
    setShowContactDialog(true)
  }

  const handleSendMessage = () => {
    // Mock send message
    console.log("Sending message to", selectedParticipant?.name, "Type:", contactType, "Message:", message)
    setShowContactDialog(false)
    setMessage("")
    setSelectedParticipant(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "contacted":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Contacté</Badge>
      case "interview_scheduled":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Entretien planifié</Badge>
      default:
        return <Badge variant="outline">Non contacté</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Link
            href="/company/hackathons"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Retour aux hackathons
          </Link>

          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="size-16 rounded-xl bg-white/20 flex items-center justify-center">
                <Code2 className="size-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">React Challenge 2024</h1>
                <p className="text-white/80">Build a complete React application in 48 hours</p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">Terminé</Badge>
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <Calendar className="size-5 mb-2" />
                <p className="text-sm text-white/80">Date</p>
                <p className="font-bold">15-17 Jan 2024</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Clock className="size-5 mb-2" />
                <p className="text-sm text-white/80">Durée</p>
                <p className="font-bold">48 heures</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Users className="size-5 mb-2" />
                <p className="text-sm text-white/80">Participants</p>
                <p className="font-bold">234</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Trophy className="size-5 mb-2" />
                <p className="text-sm text-white/80">Prix</p>
                <p className="font-bold">$5,000</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="participants" className="space-y-6">
            <TabsList>
              <TabsTrigger value="participants">Participants ({PARTICIPANTS.length})</TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="space-y-6">
              {/* Participants Table */}
              <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-primary" />
                      <h2 className="text-xl font-bold">Classement des participants</h2>
                    </div>
                    <Badge variant="outline">{PARTICIPANTS.length} participants</Badge>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-6 py-3 text-left text-sm font-semibold">Rang</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Développeur</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold">Score</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold">Temps</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold">Soumissions</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold">Statut</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PARTICIPANTS.map((participant) => (
                        <tr key={participant.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {participant.rank <= 3 ? (
                                <span
                                  className={`inline-flex items-center justify-center size-10 rounded-full font-bold ${
                                    participant.rank === 1
                                      ? "bg-primary text-white"
                                      : participant.rank === 2
                                        ? "bg-gray-400 text-white"
                                        : "bg-amber-600 text-white"
                                  }`}
                                >
                                  {participant.rank === 1 ? <Trophy className="size-5" /> : participant.rank}
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold">
                                  {participant.rank}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">{participant.name}</p>
                              <p className="text-sm text-muted-foreground">{participant.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-lg font-bold text-primary">{participant.score}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-sm text-muted-foreground">{participant.time}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-sm text-muted-foreground">{participant.submissions}</p>
                          </td>
                          <td className="px-6 py-4 text-center">{getStatusBadge(participant.status)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleContact(participant, "job")}
                                className="gap-1"
                              >
                                <Briefcase className="size-3" />
                                Offre
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleContact(participant, "interview")}
                                className="gap-1"
                              >
                                <UserCheck className="size-3" />
                                Entretien
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <Users className="size-5 text-primary mb-2" />
                  <p className="text-3xl font-bold mb-1">234</p>
                  <p className="text-sm text-muted-foreground">Participants totaux</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <CheckCircle className="size-5 text-primary mb-2" />
                  <p className="text-3xl font-bold mb-1">127</p>
                  <p className="text-sm text-muted-foreground">Soumissions reçues</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <MessageSquare className="size-5 text-primary mb-2" />
                  <p className="text-3xl font-bold mb-1">8</p>
                  <p className="text-sm text-muted-foreground">Talents contactés</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {contactType === "job" ? "Proposer une offre d'emploi" : "Planifier un entretien"}
            </DialogTitle>
            <DialogDescription>
              {contactType === "job"
                ? `Envoyez une offre d'emploi à ${selectedParticipant?.name}`
                : `Planifiez un entretien avec ${selectedParticipant?.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-1">Développeur</p>
              <p className="text-sm text-muted-foreground">{selectedParticipant?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedParticipant?.email}</p>
              <div className="mt-2">
                <Badge variant="outline">Rang #{selectedParticipant?.rank}</Badge>
                <Badge variant="outline" className="ml-2">
                  Score: {selectedParticipant?.score}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                rows={6}
                placeholder={
                  contactType === "job"
                    ? "Bonjour,\n\nNous avons été impressionnés par votre performance lors du hackathon React Challenge 2024. Nous aimerions vous proposer une opportunité de rejoindre notre équipe...\n\nCordialement,"
                    : "Bonjour,\n\nNous aimerions planifier un entretien pour discuter d'une opportunité au sein de notre entreprise. Seriez-vous disponible pour un entretien cette semaine ?\n\nCordialement,"
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendMessage} className="gap-2">
              <Mail className="size-4" />
              {contactType === "job" ? "Envoyer l'offre" : "Planifier l'entretien"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

