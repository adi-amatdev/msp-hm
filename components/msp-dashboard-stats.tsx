import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BriefcaseIcon, UsersIcon, CalendarIcon, CheckCircleIcon, ClockIcon, TrendingUpIcon } from "lucide-react"

export function MspDashboardStats() {
  const stats = [
    {
      title: "Active Job Posts",
      value: "12",
      change: "+3 this week",
      icon: <BriefcaseIcon className="h-5 w-5 text-blue-600" />,
      color: "text-blue-600",
    },
    {
      title: "Profiles Under Review",
      value: "28",
      change: "+8 today",
      icon: <UsersIcon className="h-5 w-5 text-green-600" />,
      color: "text-green-600",
    },
    {
      title: "Interviews Scheduled",
      value: "15",
      change: "6 this week",
      icon: <CalendarIcon className="h-5 w-5 text-purple-600" />,
      color: "text-purple-600",
    },
    {
      title: "Offers Released",
      value: "7",
      change: "+2 this week",
      icon: <CheckCircleIcon className="h-5 w-5 text-orange-600" />,
      color: "text-orange-600",
    },
    {
      title: "Pending HM Approvals",
      value: "5",
      change: "2 urgent",
      icon: <ClockIcon className="h-5 w-5 text-red-600" />,
      color: "text-red-600",
    },
    {
      title: "Avg. Time to Fill",
      value: "18 days",
      change: "-2 days vs last month",
      icon: <TrendingUpIcon className="h-5 w-5 text-indigo-600" />,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.color}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
