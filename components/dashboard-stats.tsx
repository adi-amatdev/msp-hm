import { BriefcaseIcon, ClipboardListIcon, ClockIcon, UsersIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
            <h2 className="text-3xl font-bold">24</h2>
            <p className="text-xs text-green-600">+2 from last week</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <BriefcaseIcon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Submitted Profiles</p>
            <h2 className="text-3xl font-bold">42</h2>
            <p className="text-xs text-green-600">+8 from last week</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <UsersIcon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Active Work Orders</p>
            <h2 className="text-3xl font-bold">16</h2>
            <p className="text-xs text-green-600">+3 from last month</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <ClipboardListIcon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Pending Timesheets</p>
            <h2 className="text-3xl font-bold">7</h2>
            <p className="text-xs text-amber-600">Due in 2 days</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <ClockIcon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
