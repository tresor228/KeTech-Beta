import { DashboardHeader } from "@/components/dashboard/header"
import { ProfileHeader } from "@/components/profile/profile-header"
import { PersonalInfoSection } from "@/components/profile/personal-info-section"
import { SkillsSection } from "@/components/profile/skills-section"
import { AchievementsSection } from "@/components/profile/achievements-section"
import { KYCSection } from "@/components/profile/kyc-section"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader />
          <PersonalInfoSection />
          <SkillsSection />
          <AchievementsSection />
          <KYCSection />
        </div>
      </main>
    </div>
  )
}
