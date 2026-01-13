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

export function CompanyHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/company/dashboard">
            <KeTechLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/company/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/company/tests" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Tests
            </Link>
            <Link href="/company/hackathons" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Hackathons
            </Link>
            <Link href="/company/jobs" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Jobs
            </Link>
            <Link href="/company/candidates" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Candidates
            </Link>
            <Link href="/company/reports" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Reports
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
                <DropdownMenuItem>Company Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/company/login">
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

export { CompanyHeader as DashboardHeader }
