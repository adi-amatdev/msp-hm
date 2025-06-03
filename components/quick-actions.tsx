"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Calendar, Clock, DollarSign, UserX, FileCheck, ClipboardCheck, Bell } from "lucide-react"

const quickActions = [
  {
    title: "Timesheets",
    description: "Review and approve contractor timesheets",
    icon: <Clock className="h-5 w-5" />,
    href: "/timesheets",
    color: "text-orange-600",
    badge: "5 Pending"
  },
  {
    title: "Expenses",
    description: "Manage expense claims and approvals",
    icon: <DollarSign className="h-5 w-5" />,
    href: "/expenses",
    color: "text-green-600",
    badge: "3 New"
  },
  {
    title: "Exit Process",
    description: "Handle contractor offboarding",
    icon: <UserX className="h-5 w-5" />,
    href: "/exit-process",
    color: "text-red-600",
    badge: "2 Active"
  },
  {
    title: "Documents",
    description: "Access and manage documents",
    icon: <FileCheck className="h-5 w-5" />,
    href: "/documents",
    color: "text-blue-600",
    badge: "7 Updated"
  },
  {
    title: "Tasks",
    description: "Track and manage assignments",
    icon: <ClipboardCheck className="h-5 w-5" />,
    href: "/tasks",
    color: "text-purple-600",
    badge: "4 Due"
  },
  {
    title: "Notifications",
    description: "View system notifications",
    icon: <Bell className="h-5 w-5" />,
    href: "/notifications",
    color: "text-indigo-600",
    badge: "9 Unread"
  }
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
              className="group flex items-start gap-4 rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className={`${action.color} mt-1`}>{action.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium group-hover:text-accent-foreground">{action.title}</h3>
                  {action.badge && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
