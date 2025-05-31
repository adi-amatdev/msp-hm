"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PendingReviews() {
  const pendingReviews = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      status: "Profile Review",
      submittedAt: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      status: "Interview Feedback",
      submittedAt: "4 hours ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      status: "Profile Review",
      submittedAt: "1 day ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingReviews.map((review) => (
            <div key={review.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{review.status}</Badge>
                <p className="text-sm text-muted-foreground">{review.submittedAt}</p>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 