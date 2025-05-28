import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from an API
const profileStatuses = [
  { status: "Submitted", count: 18, percentage: 33, color: "bg-blue-50" },
  { status: "Shortlisted", count: 12, percentage: 22, color: "bg-green-50" },
  { status: "Interview", count: 8, percentage: 15, color: "bg-purple-50" },
  { status: "Interviewed", count: 5, percentage: 9, color: "bg-amber-50" },
  { status: "Rejected", count: 7, percentage: 13, color: "bg-red-50" },
  { status: "Work Order Created", count: 4, percentage: 7, color: "bg-teal-50" },
]

export function ProfileStatusChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Profile Status</CardTitle>
        <p className="text-sm text-muted-foreground">Track your candidate profiles through the hiring process</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profileStatuses.map((status) => (
            <div key={status.status} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{status.status}</span>
                <span className="text-sm text-muted-foreground">
                  {status.count} ({status.percentage}%)
                </span>
              </div>
              <div className={`h-2 rounded-full ${status.color} relative overflow-hidden`}>
                <div
                  className="h-full bg-black rounded-full transition-all duration-300"
                  style={{ width: `${status.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
