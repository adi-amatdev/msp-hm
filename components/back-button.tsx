import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
  variant?: "default" | "primary" | "secondary"
}

export function BackButton({ href = "/", label = "Back to Dashboard", variant = "default" }: BackButtonProps) {
  const variantStyles = {
    default: "text-gray-600 hover:text-gray-900",
    primary: "text-blue-600 hover:text-blue-800",
    secondary: "text-indigo-600 hover:text-indigo-800"
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${variantStyles[variant]}`}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      {label}
    </Link>
  )
}
