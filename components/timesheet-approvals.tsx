"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TimesheetApprovals() {
  const pendingTimesheets = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      period: "Mar 1-15, 2024",
      hours: 80,
      submittedAt: "1 day ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      period: "Mar 1-15, 2024",
      hours: 75,
      submittedAt: "2 days ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      period: "Mar 1-15, 2024",
      hours: 82,
      submittedAt: "3 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timesheet Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTimesheets.map((timesheet) => (
            <div key={timesheet.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={timesheet.avatar} />
                  <AvatarFallback>{timesheet.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{timesheet.name}</p>
                  <p className="text-sm text-muted-foreground">{timesheet.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{timesheet.period}</p>
                  <p className="text-sm text-muted-foreground">{timesheet.hours} hours</p>
                </div>
                <Badge variant="outline">{timesheet.submittedAt}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 