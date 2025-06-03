"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FileText,
  Users,
  Calendar,
  Clock,
  DollarSign,
  UserX,
  XIcon,
  CuboidIcon,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const quickActions = [
    {
      label: "New Job Request",
      href: "/hiring-manager-dashboard/job-requests",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Review Profiles",
      href: "/hiring-manager-dashboard/profile-review",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Schedule Interview",
      href: "/hiring-manager-dashboard/interviews",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      label: "Timesheets",
      href: "/hiring-manager-dashboard/timesheets",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      label: "Expenses",
      href: "/hiring-manager-dashboard/expenses",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      label: "Exit Process",
      href: "/hiring-manager-dashboard/exit-process",
      icon: <UserX className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Overlay */}
      <div className={cn("app-sidebar-overlay", isOpen && "open")} onClick={onClose} />

      {/* Sidebar */}
      <div className={cn("app-sidebar", isOpen && "open")}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <CuboidIcon className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">MSP HM</span>
            </div>
            {isMobile && (
              <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="mt-6 space-y-1">
            <NavItem
              href="/hiring-manager-dashboard"
              icon={<CuboidIcon className="h-5 w-5" />}
              label="Dashboard"
            />
            {quickActions.map((action) => (
              <NavItem key={action.href} href={action.href} icon={action.icon} label={action.label} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
