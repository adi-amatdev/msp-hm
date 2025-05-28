import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon, ClockIcon, DollarSignIcon, FileTextIcon, AlertTriangleIcon } from "lucide-react"

// This would typically come from an API
const pendingApprovals = [
  {
    id: "TS-2025-001",
    type: "Timesheet",
    candidate: "Jennifer Lee",
    workOrder: "WO-2025-003",
    amount: "$4,200",
    period: "Week of Apr 3-9",
    urgency: "High",
    hoursWorked: 42,
    submittedDate: "Apr 10, 2025",
  },
  {
    id: "EXP-2025-003",
    type: "Expense",
    candidate: "Thomas Wilson",
    workOrder: "WO-2025-004",
    amount: "$350",
    description: "Network testing equipment rental",
    urgency: "Medium",
    submittedDate: "Apr 12, 2025",
  },
  {
    id: "WO-2025-007",
    type: "Work Order",
    candidate: "Sarah Davis",
    jobId: "JR-2025-005",
    client: "TechStart Inc.",
    position: "Full Stack Developer",
    urgency: "High",
    submittedDate: "Apr 14, 2025",
  },
  {
    id: "EXT-2025-001",
    type: "Extension",
    candidate: "Michael Brown",
    workOrder: "WO-2025-002",
    currentEndDate: "May 15, 2025",
    requestedExtension: "3 months",
    urgency: "Low",
    submittedDate: "Apr 8, 2025",
  },
]

export function PendingApprovals() {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Timesheet":
        return <ClockIcon className="h-4 w-4" />
      case "Expense":
        return <DollarSignIcon className="h-4 w-4" />
      case "Work Order":
        return <FileTextIcon className="h-4 w-4" />
      case "Extension":
        return <AlertTriangleIcon className="h-4 w-4" />
      default:
        return <FileTextIcon className="h-4 w-4" />
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Pending Approvals</CardTitle>
        <p className="text-sm text-muted-foreground">Items requiring your approval</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  <span className="font-medium">{item.type}</span>
                  <Badge variant="outline" className={getUrgencyColor(item.urgency)}>
                    {item.urgency}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{item.submittedDate}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ID:</span>
                  <span className="font-medium">{item.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Candidate:</span>
                  <span className="font-medium">{item.candidate}</span>
                </div>

                {item.type === "Timesheet" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Period:</span>
                      <span className="font-medium">{item.period}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hours:</span>
                      <span className="font-medium">{item.hoursWorked}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium text-green-600">{item.amount}</span>
                    </div>
                  </>
                )}

                {item.type === "Expense" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Description:</span>
                      <span className="font-medium text-right">{item.description}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium text-green-600">{item.amount}</span>
                    </div>
                  </>
                )}

                {item.type === "Work Order" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Position:</span>
                      <span className="font-medium">{item.position}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Client:</span>
                      <span className="font-medium">{item.client}</span>
                    </div>
                  </>
                )}

                {item.type === "Extension" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Current End:</span>
                      <span className="font-medium">{item.currentEndDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Extension:</span>
                      <span className="font-medium">{item.requestedExtension}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <XIcon className="h-3 w-3" />
                  Reject
                </Button>
                <Button size="sm" className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                  <CheckIcon className="h-3 w-3" />
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Link href="/msp-dashboard/approvals" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View All Approvals
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
