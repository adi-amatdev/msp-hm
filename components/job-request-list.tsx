"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function JobRequestList() {
  const jobRequests = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      experience: "5+ years",
      status: "In Review",
      submittedAt: "Mar 1, 2024",
      candidates: 3,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      experience: "3-5 years",
      status: "Active",
      submittedAt: "Feb 28, 2024",
      candidates: 5,
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      experience: "3-5 years",
      status: "Completed",
      submittedAt: "Feb 15, 2024",
      candidates: 2,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{request.title}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">{request.department}</p>
                  <span className="text-sm text-muted-foreground">•</span>
                  <p className="text-sm text-muted-foreground">{request.experience}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Submitted: {request.submittedAt}</p>
                  <p className="text-sm text-muted-foreground">{request.candidates} candidates</p>
                </div>
                <Badge
                  variant={
                    request.status === "Completed"
                      ? "success"
                      : request.status === "Active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {request.status}
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