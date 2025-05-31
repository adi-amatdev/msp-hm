"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ExpenseHistory() {
  const expenseHistory = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Frontend Developer",
      avatar: "/avatars/01.png",
      amount: 450,
      description: "Conference Registration",
      status: "Approved",
      approvedAt: "Mar 1, 2024",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/avatars/02.png",
      amount: 320,
      description: "Training Materials",
      status: "Rejected",
      approvedAt: "Mar 1, 2024",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "DevOps Engineer",
      avatar: "/avatars/03.png",
      amount: 180,
      description: "Software License",
      status: "Approved",
      approvedAt: "Mar 1, 2024",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenseHistory.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={expense.avatar} />
                  <AvatarFallback>{expense.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{expense.name}</p>
                  <p className="text-sm text-muted-foreground">{expense.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">${expense.amount}</p>
                  <p className="text-sm text-muted-foreground">{expense.description}</p>
                </div>
                <Badge variant={expense.status === "Approved" ? "success" : "destructive"}>
                  {expense.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{expense.approvedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 