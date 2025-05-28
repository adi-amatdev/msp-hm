import Link from "next/link"
import { CalendarIcon, ClockIcon, BriefcaseIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API
const recentSubmissions = [
  {
    id: 1,
    candidate: {
      name: "Alex Johnson",
      initials: "AJ",
      vendor: "TechTalent Solutions",
    },
    jobId: "JR-2025-001",
    position: "Senior React Developer",
    submittedDate: "Apr 14, 2025",
    submittedTime: "2:30 PM",
    rate: "$92/hr",
    experience: "6 years",
    status: "New",
    priority: "High",
  },
  {
    id: 2,
    candidate: {
      name: "Maria Rodriguez",
      initials: "MR",
      vendor: "Elite Contractors",
    },
    jobId: "JR-2025-003",
    position: "Data Scientist",
    submittedDate: "Apr 14, 2025",
    submittedTime: "11:45 AM",
    rate: "$108/hr",
    experience: "8 years",
    status: "Under Review",
    priority: "High",
  },
  {
    id: 3,
    candidate: {
      name: "Robert Kim",
      initials: "RK",
      vendor: "CloudExperts Inc.",
    },
    jobId: "JR-2025-002",
    position: "DevOps Engineer",
    submittedDate: "Apr 13, 2025",
    submittedTime: "4:15 PM",
    rate: "$96/hr",
    experience: "5 years",
    status: "Shortlisted",
    priority: "Medium",
  },
  {
    id: 4,
    candidate: {
      name: "Jessica Chen",
      initials: "JC",
      vendor: "Design Professionals",
    },
    jobId: "JR-2025-004",
    position: "UX/UI Designer",
    submittedDate: "Apr 13, 2025",
    submittedTime: "10:20 AM",
    rate: "$78/hr",
    experience: "4 years",
    status: "New",
    priority: "Low",
  },
  {
    id: 5,
    candidate: {
      name: "David Wilson",
      initials: "DW",
      vendor: "TechTalent Solutions",
    },
    jobId: "JR-2025-005",
    position: "Full Stack Developer",
    submittedDate: "Apr 12, 2025",
    submittedTime: "3:45 PM",
    rate: "$85/hr",
    experience: "7 years",
    status: "Interview Scheduled",
    priority: "Medium",
  },
]

export function RecentSubmissions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Shortlisted":
        return "bg-purple-100 text-purple-800"
      case "Interview Scheduled":
        return "bg-green-100 text-green-800"
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
      <CardHeader>
        <CardTitle className="text-xl">Recent Candidate Submissions</CardTitle>
        <p className="text-sm text-muted-foreground">Latest candidate profiles submitted by vendors</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {recentSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden border border-gray-200">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 border-b p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-semibold">
                    {submission.candidate.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{submission.candidate.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{submission.candidate.vendor}</p>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(submission.priority)}>
                    {submission.priority}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{submission.position}</div>
                      <div className="text-muted-foreground">{submission.jobId}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.submittedDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.submittedTime}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-medium text-green-600">{submission.rate}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{submission.experience}</span>
                  </div>

                  <Badge variant="outline" className={`${getStatusColor(submission.status)} w-full justify-center`}>
                    {submission.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 border-t">
                  <Button variant="ghost" className="rounded-none py-3 text-sm">
                    Review
                  </Button>
                  <Button variant="ghost" className="rounded-none border-l py-3 text-sm">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/msp-dashboard/candidate-review"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View All Submissions
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
