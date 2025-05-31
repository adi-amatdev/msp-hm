"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProfileReviewList() {
  const pendingProfiles = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      experience: "8 years",
      skills: ["React", "TypeScript", "Node.js"],
      submittedAt: "2 hours ago",
      jobTitle: "Senior Frontend Developer",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      experience: "5 years",
      skills: ["React", "Python", "AWS"],
      submittedAt: "4 hours ago",
      jobTitle: "Full Stack Developer",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      experience: "6 years",
      skills: ["Kubernetes", "Docker", "AWS"],
      submittedAt: "1 day ago",
      jobTitle: "DevOps Engineer",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Profile Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{profile.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{profile.experience} experience</p>
                </div>
                <Badge variant="outline">{profile.submittedAt}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm">Schedule Interview</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 