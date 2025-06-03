"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/msp-sidebar"
import { MspDashboardStats } from "@/components/msp-dashboard-stats"
import { ActiveJobRequirements } from "@/components/active-job-requirements"
import { PendingApprovals } from "@/components/pending-approvals"
import { RecentSubmissions } from "@/components/recent-submissions"
import { QuickActions } from "@/components/quick-actions"

export function MspFrontendDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ActiveJobRequirements />
              <PendingApprovals />
            </div>

            <RecentSubmissions />
          </div>
        </main>
      </div>
    </div>
  )
}
