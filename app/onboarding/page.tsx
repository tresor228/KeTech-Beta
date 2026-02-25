"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { KeTechLogo } from "@/components/ketech-logo"
import { InterestsStep } from "@/components/onboarding/interests-step"
import { SkillLevelStep } from "@/components/onboarding/skill-level-step"
import { ObjectivesStep } from "@/components/onboarding/objectives-step"

const TOTAL_STEPS = 3

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [interests, setInterests] = useState<string[]>([])
  const [skillLevel, setSkillLevel] = useState("")
  const [objectives, setObjectives] = useState<string[]>([])

  const progress = (currentStep / TOTAL_STEPS) * 100

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      await handleComplete()
    }
  }

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('ketech_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/developer/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          interests,
          level: skillLevel,
          objectives
        })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde de l\'onboarding')
      }

      router.push("/dashboard")
    } catch (error) {
      console.error('Erreur Onboarding:', error)
      // On redirige quand même pour ne pas bloquer l'utilisateur, 
      // mais on pourrait afficher une notification d'erreur
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return interests.length > 0
    if (currentStep === 2) return skillLevel !== ""
    if (currentStep === 3) return objectives.length > 0
    return false
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <KeTechLogo />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-muted border-b border-border">
        <div className="h-2 bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Step Counter */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {currentStep === 1 && <InterestsStep selected={interests} onChange={setInterests} />}
            {currentStep === 2 && <SkillLevelStep selected={skillLevel} onChange={setSkillLevel} />}
            {currentStep === 3 && <ObjectivesStep selected={objectives} onChange={setObjectives} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()} size="lg">
              {currentStep === TOTAL_STEPS ? "Complete" : "Continue"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
