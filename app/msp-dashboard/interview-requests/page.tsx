"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react"

// Mock data for interview requests
const interviewRequests = [
  {
    id: "IR-001",
    candidateName: "Maria Rodriguez",
    jobTitle: "Data Scientist",
    jobId: "JR-2025-003",
    vendor: "Elite Contractors",
    hiringManager: "Dr. Emily Rodriguez",
    hmEmail: "emily.rodriguez@dataviz.com",
    hmPhone: "+1 (555) 123-4567",
    candidateEmail: "maria.r@email.com",
    candidatePhone: "+1 (555) 987-6543",
    status: "Shortlisted - Ready for Interview",
    shortlistedDate: "Apr 15, 2025",
    preferredDates: ["Apr 22, 2025", "Apr 23, 2025", "Apr 24, 2025"],
    interviewType: "Video Call",
    notes: "Candidate prefers afternoon slots. HM available Mon-Wed.",
    priority: "High",
  },
  {
    id: "IR-002",
    candidateName: "Alex Johnson",
    jobTitle: "Senior React Developer",
    jobId: "JR-2025-001",
    vendor: "TechTalent Solutions",
    hiringManager: "Jennifer Smith",
    hmEmail: "jennifer.smith@techcorp.com",
    hmPhone: "+1 (555) 234-5678",
    candidateEmail: "alex.j@email.com",
    candidatePhone: "+1 (555) 876-5432",
    status: "Interview Requested",
    shortlistedDate: "Apr 14, 2025",
    preferredDates: ["Apr 20, 2025", "Apr 21, 2025"],
    interviewType: "Video Call",
    notes: "Technical round required. Candidate available mornings only.",
    priority: "Medium",
  },
  {
    id: "IR-003",
    candidateName: "Robert Kim",
    jobTitle: "DevOps Engineer",
    jobId: "JR-2025-002",
    vendor: "CloudExperts Inc.",
    hiringManager: "Michael Chen",
    hmEmail: "michael.chen@cloudsys.com",
    hmPhone: "+1 (555) 345-6789",
    candidateEmail: "robert.k@email.com",
    candidatePhone: "+1 (555) 765-4321",
    status: "Scheduling in Progress",
    shortlistedDate: "Apr 13, 2025",
    preferredDates: ["Apr 19, 2025"],
    interviewType: "In-person",
    notes: "System design interview. Office visit required.",
    priority: "High",
  },
  {
    id: "IR-004",
    candidateName: "Jessica Chen",
    jobTitle: "UX/UI Designer",
    jobId: "JR-2025-004",
    vendor: "Design Professionals",
    hiringManager: "Lisa Thompson",
    hmEmail: "lisa.thompson@designcorp.com",
    hmPhone: "+1 (555) 456-7890",
    candidateEmail: "jessica.c@email.com",
    candidatePhone: "+1 (555) 654-3210",
    status: "Interview Scheduled",
    shortlistedDate: "Apr 12, 2025",
    scheduledDate: "Apr 18, 2025",
    scheduledTime: "2:00 PM EST",
    interviewType: "Video Call",
    notes: "Portfolio review session scheduled.",
    priority: "Low",
  },
]

export default function InterviewRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRequests = interviewRequests.filter((request) => {
    const matchesSearch =
      request.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.hiringManager.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shortlisted - Ready for Interview":
        return "bg-blue-100 text-blue-800"
      case "Interview Requested":
        return "bg-yellow-100 text-yellow-800"
      case "Scheduling in Progress":
        return "bg-orange-100 text-orange-800"
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
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Interview Requests"
        description="Coordinate interview requests between shortlisted candidates and hiring managers"
      />

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
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

        <select
          className="h-10 rounded-md border border-gray-200 px-3 py-2 text-sm min-w-[200px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="ready">Ready for Interview</option>
          <option value="requested">Interview Requested</option>
          <option value="progress">Scheduling in Progress</option>
          <option value="scheduled">Interview Scheduled</option>
        </select>
      </div>

      {/* Interview Request Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{request.candidateName}</h3>
                <p className="text-gray-600">{request.jobTitle}</p>
                <p className="text-sm text-gray-500">
                  {request.jobId} • {request.vendor}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                  {request.priority}
                </Badge>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Hiring Manager</h4>
                <p className="text-sm font-medium">{request.hiringManager}</p>
                <div className="flex items-center gap-1 text-sm text-blue-700 mt-1">
                  <Mail className="h-3 w-3" />
                  <span>{request.hmEmail}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-700">
                  <Phone className="h-3 w-3" />
                  <span>{request.hmPhone}</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Candidate</h4>
                <p className="text-sm font-medium">{request.candidateName}</p>
                <div className="flex items-center gap-1 text-sm text-green-700 mt-1">
                  <Mail className="h-3 w-3" />
                  <span>{request.candidateEmail}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-700">
                  <Phone className="h-3 w-3" />
                  <span>{request.candidatePhone}</span>
                </div>
              </div>
            </div>

            {/* Interview Details */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Shortlisted:</span>
                  <span className="font-medium ml-1">{request.shortlistedDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Interview Type:</span>
                  <span className="font-medium ml-1">{request.interviewType}</span>
                </div>
                {request.scheduledDate && (
                  <>
                    <div>
                      <span className="text-gray-500">Scheduled Date:</span>
                      <span className="font-medium ml-1">{request.scheduledDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium ml-1">{request.scheduledTime}</span>
                    </div>
                  </>
                )}
              </div>

              {request.preferredDates && request.preferredDates.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Preferred Dates:</p>
                  <div className="flex flex-wrap gap-1">
                    {request.preferredDates.map((date) => (
                      <span key={date} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {date}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {request.notes && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Notes:</p>
                  <p className="text-sm text-gray-700">{request.notes}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {request.status === "Shortlisted - Ready for Interview" && (
                <>
                  <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-4 w-4" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact HM
                  </Button>
                </>
              )}

              {request.status === "Interview Requested" && (
                <>
                  <Button className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700">
                    <User className="h-4 w-4" />
                    Contact Candidate
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact HM
                  </Button>
                </>
              )}

              {request.status === "Scheduling in Progress" && (
                <>
                  <Button className="flex-1 gap-2 bg-yellow-600 hover:bg-yellow-700">
                    <Calendar className="h-4 w-4" />
                    Finalize Schedule
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Send Update
                  </Button>
                </>
              )}

              {request.status === "Interview Scheduled" && (
                <>
                  <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Confirm Details
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Reschedule
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
