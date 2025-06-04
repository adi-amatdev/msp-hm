"use client"

import { CuboidIcon, Menu, User, UserCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={onToggleSidebar}
          >
            <Menu className="lg:hidden h-5 w-5" />
          </Button>
          <CuboidIcon className="mx-2"/>
          <div className="lg:content-start font-bold text-xl">Talent Bridge</div>
        </div>
        <div className="flex items-center gap-2">
          <UserCircleIcon className="h-5 w-5" />
          <span className="font-medium">HM Account</span>
        </div>
      </div>
    </header>
  )
}