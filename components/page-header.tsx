"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  showBackButton?: boolean
  backHref?: string
}

export function PageHeader({ title, description, showBackButton = true, backHref = "/hiring-manager-dashboard" }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Link href={backHref}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      </div>
    </div>
  )
}
