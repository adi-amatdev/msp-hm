"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HiringManagerSidebar } from "@/components/hiring-manager-sidebar"
import { HiringManagerStats } from "@/components/hiring-manager-stats"
import { QuickActions } from "@/components/quick-actions"
import { UpcomingInterviews } from "@/components/upcoming-interviews"
import { TimesheetApprovals } from "@/components/timesheet-approvals"
import { ExpenseApprovals } from "@/components/expense-approvals"

export function HiringManagerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        <HiringManagerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <HiringManagerStats />
            <QuickActions />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <UpcomingInterviews />
              </div>
              <div className="space-y-6">
                <TimesheetApprovals />
                <ExpenseApprovals />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}