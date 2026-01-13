"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeTechLogo } from "@/components/ketech-logo"
import { ArrowLeft, Briefcase, Laptop, Building2, Rocket, Store, Factory } from "lucide-react"
import { cn } from "@/lib/utils"

type AccountType = "developer" | "company" | null
type CompanyType = "agence" | "startup" | "pme" | "grand_groupe" | "autre" | null

export default function RegisterPage() {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>(null)
  const [companyType, setCompanyType] = useState<CompanyType>(null)
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (accountType === "developer") {
      // TODO: Appel API réel pour créer le compte développeur
      // Après création, allouer 100 Keys gratuites
      // await keysService.allocateInitialKeys(userId)
      
      // Mock registration - redirect to onboarding
      // Note: En production, l'allocation des 100 Keys se fera côté serveur lors de la création du compte
      router.push("/onboarding")
    } else if (accountType === "company" && companyType) {
      // TODO: Appel API réel pour créer le compte entreprise
      router.push("/company/dashboard")
    }
  }

  const getCompanyTypeLabel = (type: CompanyType): string => {
    if (!type) return ""
    const labels: Record<NonNullable<CompanyType>, string> = {
      agence: "Agence",
      startup: "Startup",
      pme: "PME",
      grand_groupe: "Grand groupe",
      autre: "Autre",
    }
    return labels[type] || ""
  }

  const getCompanyTypeIcon = (type: CompanyType) => {
    switch (type) {
      case "agence":
        return <Briefcase className="size-5 text-foreground" />
      case "startup":
        return <Rocket className="size-5 text-foreground" />
      case "pme":
        return <Store className="size-5 text-foreground" />
      case "grand_groupe":
        return <Factory className="size-5 text-foreground" />
      default:
        return <Building2 className="size-5 text-foreground" />
    }
  }

  // Si aucun type n'est sélectionné, afficher la sélection
  if (!accountType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="size-4" />
              Retour à l'accueil
            </Link>
            <div className="flex justify-center mb-6">
              <KeTechLogo />
            </div>
            <h1 className="text-3xl font-bold mb-2">S'inscrire en tant que développeur ou entreprise</h1>
            <p className="text-muted-foreground">Sélectionnez le type de compte qui vous correspond</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Carte Développeur */}
            <button
              onClick={() => setAccountType("developer")}
              className={cn(
                "relative bg-white border border-border rounded-xl p-6 text-left transition-all",
                "hover:border-primary/50 hover:shadow-md",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 flex items-center justify-center">
                  <Laptop className="size-6 text-foreground" />
                </div>
                <div className="size-5 rounded-full border-2 border-border flex items-center justify-center flex-shrink-0">
                  <div
                    className={cn(
                      "size-3 rounded-full bg-primary transition-opacity",
                      accountType === "developer" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </div>
              <h3 className="text-base font-medium mb-2 text-foreground">Je suis un développeur</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Améliorez vos compétences avec des projets pratiques et trouvez des opportunités
              </p>
            </button>

            {/* Carte Entreprise */}
            <button
              onClick={() => setAccountType("company")}
              className={cn(
                "relative bg-white border border-border rounded-xl p-6 text-left transition-all",
                "hover:border-primary/50 hover:shadow-md",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 flex items-center justify-center">
                  <Building2 className="size-6 text-foreground" />
                </div>
                <div className="size-5 rounded-full border-2 border-border flex items-center justify-center flex-shrink-0">
                  <div
                    className={cn(
                      "size-3 rounded-full bg-primary transition-opacity",
                      accountType === "company" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </div>
              <h3 className="text-base font-medium mb-2 text-foreground">Je suis une entreprise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Agence, Startup, PME ou Grand groupe - Recrutez les meilleurs développeurs
              </p>
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // Si entreprise est sélectionnée mais pas le type d'entreprise, afficher la sélection du type
  if (accountType === "company" && !companyType) {
    const companyTypes: { value: CompanyType; label: string; icon: React.ReactNode; description: string }[] = [
      { value: "agence", label: "Agence", icon: <Briefcase className="size-5" />, description: "Agence de développement ou de marketing" },
      { value: "startup", label: "Startup", icon: <Rocket className="size-5" />, description: "Jeune entreprise en croissance" },
      { value: "pme", label: "PME", icon: <Store className="size-5" />, description: "Petite ou Moyenne Entreprise" },
      { value: "grand_groupe", label: "Grand groupe", icon: <Factory className="size-5" />, description: "Grande entreprise établie" },
      { value: "autre", label: "Autre", icon: <Building2 className="size-5" />, description: "Autre type d'organisation" },
    ]

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <button
              onClick={() => setAccountType(null)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="size-4" />
              Retour
            </button>
            <div className="flex justify-center mb-6">
              <KeTechLogo />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quel type d'entreprise êtes-vous ?</h1>
            <p className="text-muted-foreground">Sélectionnez la catégorie qui correspond le mieux à votre organisation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setCompanyType(type.value)}
                className={cn(
                  "relative bg-white border border-border rounded-xl p-6 text-left transition-all",
                  "hover:border-primary/50 hover:shadow-md",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 flex items-center justify-center text-foreground">
                    {type.icon}
                  </div>
                  <div className="size-5 rounded-full border-2 border-border flex items-center justify-center flex-shrink-0">
                    <div
                      className={cn(
                        "size-3 rounded-full bg-primary transition-opacity",
                        companyType === type.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </div>
                <h3 className="text-base font-medium mb-1 text-foreground">{type.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Afficher le formulaire d'inscription selon le type sélectionné
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <button
            onClick={() => {
              if (accountType === "company" && companyType) {
                setCompanyType(null)
              } else {
                setAccountType(null)
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="size-4" />
            Retour
          </button>
          <div className="flex justify-center mb-6">
            <KeTechLogo />
          </div>
          <h1 className="text-3xl font-bold">
            {accountType === "developer" ? "Créer votre compte développeur" : `Créer votre compte ${companyType ? getCompanyTypeLabel(companyType).toLowerCase() : "entreprise"}`}
          </h1>
          <p className="text-muted-foreground mt-2">
            {accountType === "developer"
              ? "Commencez votre parcours avec KeTech"
              : "Commencez à évaluer les meilleurs talents"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {accountType === "company" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                {companyType && (
                  <div className="space-y-2">
                    <Label htmlFor="companyType">Type d'entreprise</Label>
                    <div className="flex items-center gap-2 p-3 border border-border rounded-md bg-background">
                      <div className="text-foreground">
                        {getCompanyTypeIcon(companyType)}
                      </div>
                      <span className="text-sm font-medium">{getCompanyTypeLabel(companyType)}</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {accountType === "developer" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={accountType === "company" ? "vous@entreprise.com" : "vous@exemple.com"}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={accountType === "company" && !companyType}
            >
              {accountType === "developer" ? "Créer mon compte" : "Créer le compte entreprise"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <Link
            href={accountType === "developer" ? "/login" : "/company/login"}
            className="text-primary font-medium hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
