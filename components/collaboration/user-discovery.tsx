"use client"

import { useState } from "react"
import { Search, UserPlus, MessageSquare, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const DEMO_USERS = [
  {
    id: "1",
    name: "Moussa Diop",
    role: "Fullstack Developer",
    skills: ["React", "Node.js", "PostgreSQL"],
    avatar: "/diverse-group-avatars.png",
    compatibility: 95,
  },
  {
    id: "2",
    name: "Fatou Traoré",
    role: "Mobile Developer",
    skills: ["Flutter", "Firebase", "Dart"],
    avatar: "/pandoran-bioluminescent-forest.png",
    compatibility: 88,
  },
  {
    id: "3",
    name: "Koffi Mensah",
    role: "Backend Engineer",
    skills: ["Go", "Docker", "Kubernetes"],
    avatar: "/diverse-group-avatars.png",
    compatibility: 82,
  },
]

export function UserDiscovery() {
  const [search, setSearch] = useState("")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Discover Developers</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or skill..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {DEMO_USERS.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{user.name}</h3>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {user.compatibility}% Match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.role}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Connect
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
