import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar } from "lucide-react"
import Link from "next/link"

export function ActiveJobRequirements() {
  const jobRequirements = [
    {
      id: "JR-2025-001",
      title: "Senior React Developer",
      client: "TechCorp Inc.",
      hiringManager: "Jennifer Smith",
      priority: "High",
      status: "Active",
      profilesReceived: 8,
      shortlisted: 3,
      deadline: "Apr 15, 2025",
    },
    {
      id: "JR-2025-002",
      title: "DevOps Engineer",
      client: "CloudSys Solutions",
      hiringManager: "Michael Chen",
      priority: "Medium",
      status: "Interview Phase",
      profilesReceived: 4,
      shortlisted: 2,
      deadline: "Apr 10, 2025",
    },
    {
      id: "JR-2025-003",
      title: "Data Scientist",
      client: "DataViz Analytics",
      hiringManager: "Dr. Emily Rodriguez",
      priority: "High",
      status: "Active",
      profilesReceived: 12,
      shortlisted: 6,
      deadline: "Apr 20, 2025",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Interview Phase":
        return "bg-blue-100 text-blue-800"
      case "Offer Released":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Job Requirements</CardTitle>
        <Link href="/msp-dashboard/create-job-posts">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Create New Job
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobRequirements.map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.client}</p>
                  <p className="text-sm text-gray-500">HM: {job.hiringManager}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  <Badge variant="outline" className={getPriorityColor(job.priority)}>
                    {job.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Profiles:</span>
                  <span className="font-medium ml-1">{job.profilesReceived}</span>
                </div>
                <div>
                  <span className="text-gray-500">Shortlisted:</span>
                  <span className="font-medium ml-1">{job.shortlisted}</span>
                </div>
                <div>
                  <span className="text-gray-500">Deadline:</span>
                  <span className="font-medium ml-1">{job.deadline}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/msp-dashboard/profile-screening?jobId=${job.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Users className="h-3 w-3" />
                    Screen Profiles
                  </Button>
                </Link>
                <Link href={`/msp-dashboard/interview-requests?jobId=${job.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Calendar className="h-3 w-3" />
                    Schedule Interviews
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
