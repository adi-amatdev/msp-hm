"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, FileText, Users, Calendar, Clock, DollarSign, UserX } from "lucide-react"

interface HiringManagerSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function HiringManagerSidebar({ isOpen, onClose }: HiringManagerSidebarProps) {
  const pathname = usePathname()

  const quickActions = [
    {
      title: "New Job Request",
      href: "/hiring-manager-dashboard/job-requests",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Review Profiles",
      href: "/hiring-manager-dashboard/profile-review",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Schedule Interview",
      href: "/hiring-manager-dashboard/interviews",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Timesheets",
      href: "/hiring-manager-dashboard/timesheets",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Expenses",
      href: "/hiring-manager-dashboard/expenses",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Exit Process",
      href: "/hiring-manager-dashboard/exit-process",
      icon: <UserX className="h-5 w-5" />,
    },
  ]

  const routes = [
    {
      href: "/hiring-manager-dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/hiring-manager-dashboard",
    },
    ...quickActions.map((action) => ({
      href: action.href,
      label: action.title,
      icon: action.icon,
      active: pathname === action.href,
    })),
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  route.active ? "bg-accent text-accent-foreground" : "transparent"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
