"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  HomeIcon,
  PieChartIcon,
  UserIcon,
  XIcon,
  CuboidIcon,
  CalendarIcon,
  FileTextIcon,
  TrendingUpIcon,
  PlusIcon,
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

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
              <span className="text-lg font-semibold">MSP Frontend</span>
            </div>
            {isMobile && (
              <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="mt-6 space-y-1">
            <NavItem href="/msp-dashboard" icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" />
            <NavItem
              href="/msp-dashboard/create-job-posts"
              icon={<PlusIcon className="h-5 w-5" />}
              label="Create Job Posts"
            />
            <NavItem
              href="/msp-dashboard/profile-screening"
              icon={<UserIcon className="h-5 w-5" />}
              label="Profile Screening"
            />
            <NavItem
              href="/msp-dashboard/interview-requests"
              icon={<CalendarIcon className="h-5 w-5" />}
              label="Interview Requests"
            />
            <NavItem
              href="/msp-dashboard/release-offers"
              icon={<FileTextIcon className="h-5 w-5" />}
              label="Release Offers"
            />
            <NavItem
              href="/msp-dashboard/track-job-progress"
              icon={<TrendingUpIcon className="h-5 w-5" />}
              label="Track Job Progress"
            />
            <NavItem href="/msp-dashboard/reports" icon={<PieChartIcon className="h-5 w-5" />} label="Reports" />
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
