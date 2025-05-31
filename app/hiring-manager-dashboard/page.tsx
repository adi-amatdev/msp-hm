"use client"

import { useState } from "react"
import { HiringManagerDashboard } from "@/components/hiring-manager-dashboard"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <HiringManagerDashboard 
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    />
  )
} 