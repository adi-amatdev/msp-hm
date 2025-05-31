"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HiringManagerSidebar } from "@/components/hiring-manager-sidebar"
import { HiringManagerStats } from "@/components/hiring-manager-stats"
import { PendingReviews } from "@/components/pending-reviews"
import { TimesheetApprovals } from "@/components/timesheet-approvals"
import { ExpenseApprovals } from "@/components/expense-approvals"
import { QuickActions } from "@/components/quick-actions"

export function HiringManagerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        <HiringManagerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <HiringManagerStats />
            <QuickActions />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <PendingReviews />
              <TimesheetApprovals />
              <ExpenseApprovals />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 