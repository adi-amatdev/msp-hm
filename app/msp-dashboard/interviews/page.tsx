"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Clock, User, Video, MapPin, Plus, Edit } from "lucide-react"

// Mock data for interviews
const interviews = [
  {
    id: "INT-001",
    candidateName: "Alex Johnson",
    jobTitle: "Senior React Developer",
    jobId: "JR-2025-001",
    hiringManager: "Jennifer Smith",
    vendor: "TechTalent Solutions",
    scheduledDate: "Apr 16, 2025",
    scheduledTime: "10:00 AM EST",
    duration: "60 minutes",
    type: "Video",
    status: "Scheduled",
    round: "Technical Round",
    interviewers: ["Jennifer Smith", "Tech Lead"],
    meetingLink: "https://meet.google.com/abc-def-ghi",
    notes: "Focus on React hooks and state management",
  },
  {
    id: "INT-002",
    candidateName: "Maria Rodriguez",
    jobTitle: "Data Scientist",
    jobId: "JR-2025-003",
    hiringManager: "Dr. Emily Rodriguez",
    vendor: "Elite Contractors",
    scheduledDate: "Apr 17, 2025",
    scheduledTime: "2:00 PM EST",
    duration: "90 minutes",
    type: "Video",
    status: "Confirmed",
    round: "Final Round",
    interviewers: ["Dr. Emily Rodriguez", "Data Team Lead"],
    meetingLink: "https://zoom.us/j/123456789",
    notes: "Case study presentation required",
  },
  {
    id: "INT-003",
    candidateName: "Robert Kim",
    jobTitle: "DevOps Engineer",
    jobId: "JR-2025-002",
    hiringManager: "Michael Chen",
    vendor: "CloudExperts Inc.",
    scheduledDate: "Apr 18, 2025",
    scheduledTime: "11:30 AM EST",
    duration: "45 minutes",
    type: "In-person",
    status: "Pending Confirmation",
    round: "System Design",
    interviewers: ["Michael Chen"],
    location: "CloudSys Solutions Office",
    notes: "Whiteboard session on AWS architecture",
  },
]

const pendingInterviews = [
  {
    id: "PINT-001",
    candidateName: "Sarah Wilson",
    jobTitle: "UX/UI Designer",
    jobId: "JR-2025-004",
    hiringManager: "Lisa Thompson",
    vendor: "Design Professionals",
    status: "Awaiting HM Availability",
    submittedDate: "Apr 14, 2025",
    preferredDates: ["Apr 19, 2025", "Apr 20, 2025"],
  },
  {
    id: "PINT-002",
    candidateName: "David Chen",
    jobTitle: "Full Stack Developer",
    jobId: "JR-2025-005",
    hiringManager: "Alex Johnson",
    vendor: "TechTalent Solutions",
    status: "Candidate Unavailable",
    submittedDate: "Apr 13, 2025",
    candidateNote: "Available after Apr 22, 2025",
  },
]

export default function InterviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending Confirmation":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Interview Coordination"
        description="Schedule and manage interviews between candidates and hiring managers"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700">
            Schedule Interview
          </Button>
        }
      />

      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduled">Scheduled Interviews</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search by candidate, job title, or hiring manager..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="h-10 rounded-md border border-gray-200 px-3 py-2 text-sm min-w-[140px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>

              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Schedule New
              </Button>
            </div>
          </div>

          {/* Interview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <Card key={interview.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{interview.candidateName}</h3>
                    <p className="text-gray-600">{interview.jobTitle}</p>
                    <p className="text-sm text-gray-500">
                      {interview.jobId} • {interview.vendor}
                    </p>
                  </div>
                  <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {interview.scheduledDate} at {interview.scheduledTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {interview.duration} • {interview.round}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">HM: {interview.hiringManager}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {interview.type === "Video" ? (
                      <Video className="h-4 w-4 text-gray-500" />
                    ) : (
                      <MapPin className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="text-sm">{interview.type === "Video" ? "Video Call" : interview.location}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Interviewers:</strong> {interview.interviewers.join(", ")}
                  </p>
                  {interview.notes && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Notes:</strong> {interview.notes}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  {interview.type === "Video" && (
                    <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                      <Video className="h-4 w-4" />
                      Join Call
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <div className="space-y-4">
            {pendingInterviews.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{request.candidateName}</h3>
                    <p className="text-gray-600">{request.jobTitle}</p>
                    <p className="text-sm text-gray-500">
                      {request.jobId} • {request.vendor}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    {request.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Hiring Manager</p>
                    <p className="font-medium">{request.hiringManager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">{request.submittedDate}</p>
                  </div>
                </div>

                {request.preferredDates && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Preferred Dates</p>
                    <div className="flex gap-2">
                      {request.preferredDates.map((date) => (
                        <span key={date} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {request.candidateNote && (
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm">
                      <strong>Candidate Note:</strong> {request.candidateNote}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Schedule Interview</Button>
                  <Button variant="outline" className="flex-1">
                    Contact HM
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="p-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration</h3>
              <p className="text-gray-500 mb-4">
                Calendar view will show all scheduled interviews in a monthly/weekly format
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Connect Calendar</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
