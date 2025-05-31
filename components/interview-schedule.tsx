"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function InterviewSchedule() {
  const upcomingInterviews = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      date: "Mar 5, 2024",
      time: "10:00 AM",
      duration: "60 min",
      type: "Technical Interview",
      status: "Scheduled",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      date: "Mar 6, 2024",
      time: "2:00 PM",
      duration: "45 min",
      type: "Technical Interview",
      status: "Scheduled",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      date: "Mar 7, 2024",
      time: "11:00 AM",
      duration: "60 min",
      type: "Technical Interview",
      status: "Scheduled",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={interview.avatar} />
                  <AvatarFallback>{interview.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{interview.name}</p>
                  <p className="text-sm text-muted-foreground">{interview.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{interview.date}</p>
                  <p className="text-sm text-muted-foreground">{interview.time} ({interview.duration})</p>
                </div>
                <Badge variant="outline">{interview.type}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm">Start Interview</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 