import Link from "next/link"
import { KeTechLogo } from "@/components/ketech-logo"
import { Button } from "@/components/ui/button"
import { Bell, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <KeTechLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/tests" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Tests
            </Link>
            <Link href="/jobs" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Jobs
            </Link>
            <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Projets
            </Link>
            <Link href="/hackathons" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Hackathons
            </Link>
            <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Community
            </Link>
            <Link href="/messages" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Messages
            </Link>
            <Link href="/profile" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile#kyc">KYC Verification</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="size-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
