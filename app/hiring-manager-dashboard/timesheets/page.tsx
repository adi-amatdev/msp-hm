"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimesheetApprovals } from "@/components/timesheet-approvals"
import { TimesheetHistory } from "@/components/timesheet-history"

export default function TimesheetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Timesheet Management</h1>
        <p className="text-gray-600">Review and approve submitted timesheets</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <TimesheetApprovals />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <TimesheetHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
} 