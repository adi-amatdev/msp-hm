"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function ExpenseApprovals() {
  const pendingExpenses = [
    {
      id: 1,
      name: "John Smith",
      amount: 450,
      description: "Conference",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      amount: 320,
      description: "Training",
    },
    {
      id: 3,
      name: "Michael Brown",
      amount: 180,
      description: "Software",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Expense Approvals</CardTitle>
        <Link 
          href="/hiring-manager-dashboard/expenses" 
          className="text-xs text-blue-600 hover:underline flex items-center"
        >
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingExpenses.map((expense) => (
            <Link 
              key={expense.id} 
              href="/hiring-manager-dashboard/expenses"
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{expense.name}</p>
                <p className="text-xs text-muted-foreground">{expense.description}</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                ${expense.amount}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}