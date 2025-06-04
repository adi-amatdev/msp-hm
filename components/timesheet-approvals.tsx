"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function TimesheetApprovals() {
  const pendingTimesheets = [
    {
      id: 1,
      name: "John Smith",
      hours: 80,
      period: "Mar 1-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      hours: 75,
      period: "Mar 1-15",
    },
    {
      id: 3,
      name: "Michael Brown",
      hours: 82,
      period: "Mar 1-15",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Timesheet Approvals</CardTitle>
        <Link 
          href="/hiring-manager-dashboard/timesheets" 
          className="text-xs text-blue-600 hover:underline flex items-center"
        >
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingTimesheets.map((timesheet) => (
            <Link 
              key={timesheet.id} 
              href="/hiring-manager-dashboard/timesheets"
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{timesheet.name}</p>
                <p className="text-xs text-muted-foreground">{timesheet.period}</p>
              </div>
              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                {timesheet.hours}h
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}