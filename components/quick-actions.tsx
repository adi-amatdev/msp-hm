"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Calendar, Clock, DollarSign, UserX } from "lucide-react"

const quickActions = [
  {
    title: "New Job Request",
    description: "Submit a new staffing requirement",
    icon: <FileText className="h-5 w-5" />,
    href: "/hiring-manager-dashboard/job-requests",
    color: "text-blue-600",
  },
  {
    title: "Review Profiles",
    description: "Evaluate candidate profiles",
    icon: <Users className="h-5 w-5" />,
    href: "/hiring-manager-dashboard/profile-review",
    color: "text-green-600",
  },
  {
    title: "Schedule Interview",
    description: "Set up candidate interviews",
    icon: <Calendar className="h-5 w-5" />,
    href: "/hiring-manager-dashboard/interviews",
    color: "text-purple-600",
  },
  {
    title: "Timesheets",
    description: "Review and approve timesheets",
    icon: <Clock className="h-5 w-5" />,
    href: "/hiring-manager-dashboard/timesheets",
    color: "text-orange-600",
  },
  {
    title: "Expenses",
    description: "Manage expense approvals",
    icon: <DollarSign className="h-5 w-5" />,
    href: "/hiring-manager-dashboard/expenses",
    color: "text-red-600",
  },
  {
    title: "Exit Process",
    description: "Handle employee exits",
    icon: <UserX className="h-5 w-5" />,
    href: "/hiring-manager-dashboard/exit-process",
    color: "text-gray-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className={action.color}>{action.icon}</div>
              <div>
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
