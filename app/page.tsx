"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KeTechLogo } from "@/components/ketech-logo"
import { ArrowRight, CheckCircle, Users, Award, Laptop, Building2, Code, TrendingUp, Shield, Zap, Star, Target, BarChart3 } from "lucide-react"
import { Footer } from "@/components/footer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <KeTechLogo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setShowLoginDialog(true)}>
              Login
            </Button>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Dialog de sélection pour Login */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Se connecter en tant que</DialogTitle>
            <DialogDescription>
              Sélectionnez le type de compte pour vous connecter
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Link href="/login" onClick={() => setShowLoginDialog(false)}>
              <Button
                variant="outline"
                className="w-full h-auto p-6 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Laptop className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Développeur</p>
                    <p className="text-sm text-muted-foreground">
                      Connectez-vous à votre compte développeur
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/company/login" onClick={() => setShowLoginDialog(false)}>
              <Button
                variant="outline"
                className="w-full h-auto p-6 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Entreprise</p>
                    <p className="text-sm text-muted-foreground">
                      Connectez-vous à votre compte entreprise
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">

          <h1 className="text-5xl font-bold text-balance leading-tight">
            Technical Evaluation & Talent Matching for African Developers
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover top tech talent, evaluate skills accurately, and connect with the best developers across Africa
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Commencer <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
              <CheckCircle className="size-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Technical Assessments</h3>
            <p className="text-muted-foreground leading-relaxed">
              Comprehensive coding tests with real-world scenarios and automatic evaluation
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
              <Users className="size-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Talent Matching</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connect verified developers with leading companies across Africa
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
              <Award className="size-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Skill Development</h3>
            <p className="text-muted-foreground leading-relaxed">
              Participate in hackathons and challenges to improve your skills
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <Users className="size-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">10K+</h3>
              <p className="text-muted-foreground">Développeurs actifs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <Building2 className="size-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Entreprises partenaires</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <Code className="size-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-muted-foreground">Tests complétés</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <Target className="size-8 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">85%</h3>
              <p className="text-muted-foreground">Taux de placement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Comment ça marche</h2>
          <p className="text-xl text-muted-foreground">
            Une plateforme simple et efficace pour connecter les talents aux opportunités
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold">Créez votre profil</h3>
            <p className="text-muted-foreground">
              Inscrivez-vous en tant que développeur ou entreprise et complétez votre profil avec vos compétences et besoins
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold">Évaluez et découvrez</h3>
            <p className="text-muted-foreground">
              Passez des tests techniques pour valider vos compétences ou évaluez des candidats pour trouver les meilleurs talents
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold">Connectez-vous</h3>
            <p className="text-muted-foreground">
              Trouvez des opportunités d'emploi avec notre système de Keys ou recrutez les meilleurs développeurs d'Afrique
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pourquoi choisir KeTech</h2>
            <p className="text-xl text-muted-foreground">
              La plateforme de référence pour l'évaluation technique et le recrutement en Afrique
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
                <Zap className="size-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Rapide et efficace</h3>
              <p className="text-sm text-muted-foreground">
                Processus d'évaluation automatisé pour des résultats en temps réel
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Sécurisé et vérifié</h3>
              <p className="text-sm text-muted-foreground">
                Système KYC pour garantir l'authenticité des profils et des compétences
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
                <TrendingUp className="size-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Croissance continue</h3>
              <p className="text-sm text-muted-foreground">
                Suivez votre progression et développez vos compétences avec des projets pratiques
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
                <BarChart3 className="size-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Analyses détaillées</h3>
              <p className="text-sm text-muted-foreground">
                Rapports et statistiques pour mesurer vos performances et améliorer vos résultats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
          <p className="text-xl text-muted-foreground">
            Découvrez les expériences de nos développeurs et entreprises partenaires
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "KeTech m'a permis de trouver mon premier emploi en tant que développeur React. Le système de Keys est génial et les tests sont très réalistes."
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Amadou D.</p>
                <p className="text-sm text-muted-foreground">Développeur Frontend</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "En tant qu'entreprise, nous avons trouvé des développeurs très talentueux grâce à KeTech. Les profils vérifiés nous font gagner beaucoup de temps."
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">TechCorp Africa</p>
                <p className="text-sm text-muted-foreground">Startup Dakar</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-4 italic">
              "Les hackathons et projets pratiques m'ont aidé à améliorer mes compétences en développement. C'est une excellente plateforme pour apprendre."
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Fatou S.</p>
                <p className="text-sm text-muted-foreground">Développeuse Full Stack</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Prêt à commencer ?</h2>
            <p className="text-xl text-primary-foreground/90">
              Rejoignez des milliers de développeurs et entreprises qui font confiance à KeTech
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  Créer un compte <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
