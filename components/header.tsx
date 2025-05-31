"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Hiring Manager Portal</h1>
        </div>
      </div>
    </header>
  )
}
