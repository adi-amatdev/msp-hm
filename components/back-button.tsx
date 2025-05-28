import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href = "/", label = "Back to Dashboard" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      {label}
    </Link>
  )
}
