"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InterviewFeedback() {
  const completedInterviews = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      date: "Mar 1, 2024",
      time: "10:00 AM",
      type: "Technical Interview",
      status: "Pending Feedback",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      date: "Feb 28, 2024",
      time: "2:00 PM",
      type: "Technical Interview",
      status: "Feedback Submitted",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      date: "Feb 27, 2024",
      time: "11:00 AM",
      type: "Technical Interview",
      status: "Feedback Submitted",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {completedInterviews.map((interview) => (
            <div key={interview.id} className="space-y-4">
              <div className="flex items-center justify-between">
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
                    <p className="text-sm text-muted-foreground">{interview.time}</p>
                  </div>
                  <Badge variant="outline">{interview.type}</Badge>
                  <Badge
                    variant={interview.status === "Feedback Submitted" ? "success" : "secondary"}
                  >
                    {interview.status}
                  </Badge>
                </div>
              </div>

              {interview.status === "Pending Feedback" && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`decision-${interview.id}`}>Interview Decision</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proceed">Proceed to Next Round</SelectItem>
                        <SelectItem value="hire">Ready to Hire</SelectItem>
                        <SelectItem value="reject">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`feedback-${interview.id}`}>Technical Assessment</Label>
                    <Textarea
                      id={`feedback-${interview.id}`}
                      placeholder="Provide detailed feedback on technical skills, problem-solving abilities, and overall performance..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`notes-${interview.id}`}>Additional Notes</Label>
                    <Textarea
                      id={`notes-${interview.id}`}
                      placeholder="Any additional comments or observations..."
                    />
                  </div>

                  <Button className="w-full">Submit Feedback</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 