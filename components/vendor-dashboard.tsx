"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { JobRequirementsTable } from "@/components/job-requirements-table"
import { ProfileStatusChart } from "@/components/profile-status-chart"
import { UpcomingInterviews } from "@/components/upcoming-interviews"

export function VendorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <DashboardStats />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <JobRequirementsTable />
              <ProfileStatusChart />
            </div>
            <UpcomingInterviews />
          </div>
        </main>
      </div>
    </div>
  )
}
