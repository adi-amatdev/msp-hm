"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-sidebar"
import { MspDashboardStats } from "@/components/msp-dashboard-stats"
import { QuickActions } from "@/components/quick-actions"
import { UpcomingInterviews } from "./upcoming-interviews"
import { TimesheetApprovals } from "./timesheet-approvals"
import { ExpenseApprovals } from "./expense-approvals"

export function MspFrontendDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MSP HM Dashboard</h1>
                <p className="text-gray-600">Manage the complete hiring pipeline from job creation to offer release</p>
              </div>
            </div>

            <MspDashboardStats />

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