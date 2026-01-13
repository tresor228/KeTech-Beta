"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PersonalInfoSection() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="John Doe" disabled={!isEditing} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" disabled={!isEditing} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+234 812 345 6789" disabled={!isEditing} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="Lagos, Nigeria" disabled={!isEditing} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={4}
            defaultValue="Passionate full-stack developer with 3+ years of experience building web applications."
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  )
}
