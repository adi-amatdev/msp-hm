"use client"

import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
  backVariant?: "default" | "primary" | "secondary"
  action?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  showBackButton = true,
  backHref = "/",
  backLabel = "Back to Dashboard",
  backVariant = "default",
  action
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2">
        {showBackButton && (
          <BackButton href={backHref} label={backLabel} variant={backVariant} />
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}