"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TimesheetHistory() {
  const timesheetHistory = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      period: "Feb 15-28, 2024",
      hours: 80,
      status: "Approved",
      approvedAt: "Mar 1, 2024",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      period: "Feb 15-28, 2024",
      hours: 75,
      status: "Rejected",
      approvedAt: "Mar 1, 2024",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      period: "Feb 15-28, 2024",
      hours: 82,
      status: "Approved",
      approvedAt: "Mar 1, 2024",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timesheet History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timesheetHistory.map((timesheet) => (
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
                <Badge variant={timesheet.status === "Approved" ? "success" : "destructive"}>
                  {timesheet.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{timesheet.approvedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 