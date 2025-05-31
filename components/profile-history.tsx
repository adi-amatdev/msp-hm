"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ProfileHistory() {
  const profileHistory = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      experience: "8 years",
      skills: ["React", "TypeScript", "Node.js"],
      status: "Interview Scheduled",
      reviewedAt: "Mar 1, 2024",
      jobTitle: "Senior Frontend Developer",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      experience: "5 years",
      skills: ["React", "Python", "AWS"],
      status: "Rejected",
      reviewedAt: "Feb 28, 2024",
      jobTitle: "Full Stack Developer",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      experience: "6 years",
      skills: ["Kubernetes", "Docker", "AWS"],
      status: "Hired",
      reviewedAt: "Feb 15, 2024",
      jobTitle: "DevOps Engineer",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Review History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profileHistory.map((profile) => (
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
                <Badge
                  variant={
                    profile.status === "Hired"
                      ? "success"
                      : profile.status === "Interview Scheduled"
                      ? "default"
                      : "destructive"
                  }
                >
                  {profile.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{profile.reviewedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 