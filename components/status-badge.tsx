import { cn } from "@/lib/utils"

type StatusType =
  | "active"
  | "pending"
  | "approved"
  | "rejected"
  | "draft"
  | "submitted"
  | "shortlisted"
  | "interview"
  | "interviewed"
  | "documents"
  | "extension"
  | "created"

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusLower = status.toLowerCase()

  const getStatusClass = () => {
    switch (statusLower) {
      case "active":
        return "status-active"
      case "pending":
      case "pending approval":
        return "status-pending"
      case "approved":
        return "status-approved"
      case "rejected":
        return "status-rejected"
      case "draft":
        return "status-draft"
      case "submitted":
        return "status-submitted"
      case "shortlisted":
        return "status-shortlisted"
      case "interview":
        return "status-interview"
      case "interviewed":
        return "status-interviewed"
      case "documents pending":
        return "status-documents"
      case "extension requested":
        return "status-extension"
      case "work order created":
        return "status-created"
      default:
        return "status-draft"
    }
  }

  return <span className={cn("status-badge", getStatusClass(), className)}>{status}</span>
}
