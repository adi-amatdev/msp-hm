"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ExitProcessList() {
  const exitProcesses = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      reason: "Project Completion",
      lastDay: "Mar 31, 2024",
      status: "In Progress",
      initiatedAt: "Mar 1, 2024",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      reason: "Performance Issues",
      lastDay: "Mar 15, 2024",
      status: "Completed",
      initiatedAt: "Feb 15, 2024",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      reason: "Budget Constraints",
      lastDay: "Apr 15, 2024",
      status: "Pending",
      initiatedAt: "Mar 1, 2024",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exit Processes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exitProcesses.map((process) => (
            <div key={process.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={process.avatar} />
                  <AvatarFallback>{process.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{process.name}</p>
                  <p className="text-sm text-muted-foreground">{process.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{process.reason}</p>
                  <p className="text-sm text-muted-foreground">Last day: {process.lastDay}</p>
                </div>
                <Badge
                  variant={
                    process.status === "Completed"
                      ? "success"
                      : process.status === "In Progress"
                      ? "default"
                      : "secondary"
                  }
                >
                  {process.status}
                </Badge>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 