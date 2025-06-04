import Link from "next/link"
import { CalendarIcon, ClockIcon, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API
const interviews = [
  {
    id: 1,
    candidate: {
      name: "Michael Johnson",
      position: "Senior React Developer",
    },
    date: "Apr 5, 2025",
    time: "10:00 AM",
    type: "Video",
  },
  {
    id: 2,
    candidate: {
      name: "Sarah Williams",
      position: "DevOps Engineer",
    },
    date: "Apr 7, 2025",
    time: "2:30 PM",
    type: "Video",
  },
  {
    id: 3,
    candidate: {
      name: "David Chen",
      position: "Data Scientist",
    },
    date: "Apr 8, 2025",
    time: "11:15 AM",
    type: "In-person",
  },
]

export function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Upcoming Interviews</CardTitle>
        <Link 
          href="/hiring-manager-dashboard/interviews" 
          className="text-xs text-blue-600 hover:underline flex items-center"
        >
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Link
              key={interview.id}
              href="/hiring-manager-dashboard/interviews"
              className="flex items-center justify-between border-b pb-4 last:border-0 hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <div>
                <h3 className="font-medium">{interview.candidate.name}</h3>
                <p className="text-sm text-muted-foreground">{interview.candidate.position}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {interview.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {interview.time}
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={interview.type === "Video" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}
              >
                {interview.type}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}