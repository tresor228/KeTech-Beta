import { Search, Filter, UserPlus, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardHeader } from "@/components/dashboard/header"
import Link from "next/link"
import { Suspense } from "react"

const users = [
  {
    id: 1,
    name: "Amina Diallo",
    avatar: "/placeholder.svg?key=lyrax",
    location: "Dakar, Senegal",
    score: 92,
    skills: ["React", "Node.js", "TypeScript"],
    interests: ["Web Development", "Mobile Apps"],
    matchScore: 95,
    isOnline: true,
  },
  {
    id: 2,
    name: "Kwame Mensah",
    avatar: "/placeholder.svg?key=zb9ph",
    location: "Accra, Ghana",
    score: 88,
    skills: ["Python", "Django", "PostgreSQL"],
    interests: ["Backend", "AI/ML"],
    matchScore: 87,
    isOnline: false,
  },
  {
    id: 3,
    name: "Zanele Ndlovu",
    avatar: "/placeholder.svg?key=n5y3r",
    location: "Johannesburg, South Africa",
    score: 90,
    skills: ["Vue.js", "GraphQL", "AWS"],
    interests: ["Cloud", "DevOps"],
    matchScore: 82,
    isOnline: true,
  },
  {
    id: 4,
    name: "Ibrahim Kamara",
    avatar: "/placeholder.svg?key=ch0mc",
    location: "Abidjan, Côte d'Ivoire",
    score: 85,
    skills: ["Java", "Spring Boot", "MySQL"],
    interests: ["Enterprise", "Backend"],
    matchScore: 78,
    isOnline: true,
  },
]

const aiSuggestions = [
  {
    id: 5,
    name: "Fatima Al-Mahdi",
    avatar: "/placeholder.svg?key=3yby8",
    location: "Cairo, Egypt",
    score: 94,
    reason: "Perfect match for your React skills. Both interested in collaborative open-source projects.",
    skills: ["React", "Next.js", "TailwindCSS"],
  },
  {
    id: 6,
    name: "Chidi Okeke",
    avatar: "/placeholder.svg?key=ga3sd",
    location: "Lagos, Nigeria",
    score: 89,
    reason: "Looking for hackathon partners with similar tech stack. High collaboration rate.",
    skills: ["Node.js", "MongoDB", "Express"],
  },
]

function Loading() {
  return <div>Loading...</div>
}

function CommunityContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Connect with developers across Africa and collaborate on projects</p>
        </div>

        {/* AI Suggestions Section */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">AI Collaboration Suggestions</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">Based on your skills, interests, and collaboration history</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((user) => (
              <div
                key={user.id}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <Avatar className="h-14 w-14 border-2 border-blue-100">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.location}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Score: {user.score}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{user.reason}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/community/${user.id}`}>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </Link>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search by name, skills, or location..." className="pl-10 h-11" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="match">
                <DropdownMenuRadioItem value="match">Best Match</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="score">Highest Score</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="online">Online Now</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="location">Location</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{user.location}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Global Score</span>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{user.score}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${user.matchScore}%` }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.matchScore}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-4">
                <Link href={`/community/${user.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </Link>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CommunityContent />
    </Suspense>
  )
}
