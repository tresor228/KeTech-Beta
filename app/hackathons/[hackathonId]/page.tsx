import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Clock, Target, Award, Code2, ArrowLeft } from "lucide-react"

export default function HackathonDetailsPage({ params }: { params: { hackathonId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to hackathons
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="size-16 rounded-xl bg-white/20 flex items-center justify-center">
                <Code2 className="size-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">React Challenge 2024</h1>
                <p className="text-white/80">Build a complete React application in 48 hours</p>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium">Upcoming</span>
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <Calendar className="size-5 mb-2" />
                <p className="text-sm text-white/80">Start Date</p>
                <p className="font-bold">Jan 15, 2024</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Clock className="size-5 mb-2" />
                <p className="text-sm text-white/80">Duration</p>
                <p className="font-bold">48 hours</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Users className="size-5 mb-2" />
                <p className="text-sm text-white/80">Participants</p>
                <p className="font-bold">234</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Trophy className="size-5 mb-2" />
                <p className="text-sm text-white/80">Prize Pool</p>
                <p className="font-bold">$5,000</p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Join developers from across Africa in this exciting React challenge. You'll have 48 hours to build a
              complete, production-ready React application that showcases your skills and creativity.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This hackathon is designed to test your ability to work under pressure, implement modern React patterns,
              and deliver high-quality code within a tight deadline.
            </p>
          </div>

          {/* Challenge Requirements */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Target className="size-6 text-primary" />
              <h2 className="text-2xl font-bold">Challenge Requirements</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Build a fully functional React application with routing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Implement state management (Context API or Redux)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Create responsive design for mobile and desktop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Include proper error handling and loading states</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Write clean, maintainable code with comments</span>
              </li>
            </ul>
          </div>

          {/* Prizes */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Award className="size-6 text-primary" />
              <h2 className="text-2xl font-bold">Prizes</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-6 border-2 border-primary rounded-xl bg-primary/5">
                <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <p className="text-2xl font-bold text-primary mb-1">$2,500</p>
                <p className="text-sm text-muted-foreground">First Place</p>
              </div>
              <div className="text-center p-6 border border-border rounded-xl">
                <div className="size-12 rounded-full bg-muted text-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <p className="text-2xl font-bold mb-1">$1,500</p>
                <p className="text-sm text-muted-foreground">Second Place</p>
              </div>
              <div className="text-center p-6 border border-border rounded-xl">
                <div className="size-12 rounded-full bg-muted text-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <p className="text-2xl font-bold mb-1">$1,000</p>
                <p className="text-sm text-muted-foreground">Third Place</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl shadow-sm">
            <div>
              <p className="font-medium mb-1">Ready to compete?</p>
              <p className="text-sm text-muted-foreground">Registration closes on Jan 14, 2024</p>
            </div>
            <Button size="lg">Register Now</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
