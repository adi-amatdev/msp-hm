"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseApprovals } from "@/components/expense-approvals"
import { ExpenseHistory } from "@/components/expense-history"

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
        <p className="text-gray-600">Review and approve expense claims</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <ExpenseApprovals />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <ExpenseHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
} 