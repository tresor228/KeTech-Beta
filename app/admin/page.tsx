"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Users, Building, ShieldCheck, Briefcase, Plus, Search, CheckCircle, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
    const { toast } = useToast()

    const [companies, setCompanies] = useState([
        { id: 1, name: "TechCorp", status: "pending", requestsJobs: true },
        { id: 2, name: "Innovate Ltd", status: "approved", requestsJobs: false },
    ])

    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", isAmbassador: false, score: 847 },
        { id: 2, name: "Alice Smith", isAmbassador: true, score: 920 },
    ])

    const approveCompany = (id: number) => {
        setCompanies(companies.map(c => c.id === id ? { ...c, status: "approved" } : c))
        toast({ title: "Entreprise Approuvée", description: "L'entreprise a maintenant le droit de publier des offres." })
    }

    const makeAmbassador = (id: number) => {
        setUsers(users.map(u => u.id === id ? { ...u, isAmbassador: true } : u))
        toast({ title: "Badge Décerné", description: "L'utilisateur est maintenant Ambassadeur KeTech." })
    }

    const uploadProject = (e: React.FormEvent) => {
        e.preventDefault()
        toast({ title: "Projet Publié", description: "Le nouveau projet a été mis en ligne avec succès." })
    }

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Superutilisateur (Admin)</h1>
                        <p className="text-muted-foreground">Gérez la plateforme, les accès et les projets.</p>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="bg-muted p-1 rounded-lg">
                        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                        <TabsTrigger value="companies">Entreprises & Offres</TabsTrigger>
                        <TabsTrigger value="users">Utilisateurs & Badges</TabsTrigger>
                        <TabsTrigger value="projects">Ajouter Projet</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Utilisateurs Inscrits</CardTitle>
                                        <Users className="size-4 text-primary" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1,248</div>
                                    <p className="text-xs text-green-500 mt-1">+12% ce mois-ci</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Entreprises Partenaires</CardTitle>
                                        <Building className="size-4 text-primary" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">42</div>
                                    <p className="text-xs text-green-500 mt-1">+4 cette semaine</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Offres Publiées</CardTitle>
                                        <Briefcase className="size-4 text-primary" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">156</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Ambassadeurs</CardTitle>
                                        <ShieldCheck className="size-4 text-primary" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">24</div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="companies">
                        <Card>
                            <CardHeader>
                                <CardTitle>Validation des Entreprises</CardTitle>
                                <CardDescription>Accordez les droits de publication d'offres aux entreprises.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {companies.map(company => (
                                        <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                                            <div>
                                                <h3 className="font-semibold">{company.name}</h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                    Status: {company.status === "approved" ? <span className="text-green-500">Approuvé</span> : <span className="text-amber-500">En attente</span>}
                                                </p>
                                            </div>
                                            <Button
                                                disabled={company.status === "approved"}
                                                onClick={() => approveCompany(company.id)}
                                                variant={company.status === "approved" ? "outline" : "default"}
                                            >
                                                {company.status === "approved" ? "Droits Accordés" : "Accorder droits (Offres)"}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gestion des Talents et Badges</CardTitle>
                                <CardDescription>Nommez des utilisateurs Ambassadeurs de la plateforme.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 flex gap-4">
                                    <div className="relative flex-1 max-w-sm">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <Input placeholder="Rechercher un développeur..." className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {users.map(user => (
                                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                                            <div>
                                                <h3 className="font-semibold flex items-center gap-2">
                                                    {user.name}
                                                    {user.isAmbassador && <Award className="size-4 text-amber-500" />}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">Score: {user.score}</p>
                                            </div>
                                            <Button
                                                disabled={user.isAmbassador}
                                                onClick={() => makeAmbassador(user.id)}
                                                variant={user.isAmbassador ? "secondary" : "default"}
                                            >
                                                {user.isAmbassador ? "Déjà Ambassadeur" : "Nommer Ambassadeur"}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects">
                        <Card>
                            <CardHeader>
                                <CardTitle>Uploader un Projet</CardTitle>
                                <CardDescription>Ajoutez un nouveau projet ou test technique pour les développeurs.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={uploadProject} className="space-y-4 max-w-2xl">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Titre du Projet</label>
                                        <Input placeholder="Ex: Créer une API REST en Node.js" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description et Consignes</label>
                                        <textarea
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            placeholder="Décrivez les attentes et règles..."
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Niveau requis</label>
                                        <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                            <option>Junior (Beginner)</option>
                                            <option>Intérmédiaire</option>
                                            <option>Sénior (Advanced)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date limite (Optionnel)</label>
                                        <Input type="date" />
                                    </div>
                                    <Button type="submit" className="w-full sm:w-auto">
                                        <Plus className="size-4 mr-2" />
                                        Publier le Projet
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </main>
        </div>
    )
}
