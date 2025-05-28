"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, TrendingUp, AlertTriangle, CheckCircle, Calendar, MessageSquare } from "lucide-react"

// Mock data for job progress tracking
const jobRequirements = [
  {
    id: "JR-2025-001",
    title: "Senior React Developer",
    hiringManager: "Jennifer Smith",
    department: "Engineering",
    postedDate: "Apr 10, 2025",
    deadline: "Apr 30, 2025",
    status: "Active",
    priority: "High",
    progress: {
      stage: "Profile Review",
      percentage: 65,
      stages: [
        { name: "Job Posted", completed: true, date: "Apr 10" },
        { name: "Vendor Outreach", completed: true, date: "Apr 11" },
        { name: "Profile Submission", completed: true, date: "Apr 14" },
        { name: "Profile Review", completed: false, date: "" },
        { name: "Interview Scheduling", completed: false, date: "" },
        { name: "Offer Release", completed: false, date: "" },
        { name: "Onboarding", completed: false, date: "" },
      ],
    },
    vendorMetrics: {
      totalVendors: 8,
      respondedVendors: 6,
      profilesSubmitted: 12,
      avgResponseTime: "2.3 days",
      lastActivity: "2 hours ago",
    },
    candidatePipeline: {
      submitted: 12,
      underReview: 5,
      shortlisted: 3,
      interviewed: 1,
      offered: 0,
    },
  },
  {
    id: "JR-2025-002",
    title: "DevOps Engineer",
    hiringManager: "Michael Chen",
    department: "Infrastructure",
    postedDate: "Apr 8, 2025",
    deadline: "Apr 25, 2025",
    status: "Interview Phase",
    priority: "Medium",
    progress: {
      stage: "Interview Scheduling",
      percentage: 80,
      stages: [
        { name: "Job Posted", completed: true, date: "Apr 8" },
        { name: "Vendor Outreach", completed: true, date: "Apr 9" },
        { name: "Profile Submission", completed: true, date: "Apr 12" },
        { name: "Profile Review", completed: true, date: "Apr 15" },
        { name: "Interview Scheduling", completed: false, date: "" },
        { name: "Offer Release", completed: false, date: "" },
        { name: "Onboarding", completed: false, date: "" },
      ],
    },
    vendorMetrics: {
      totalVendors: 5,
      respondedVendors: 4,
      profilesSubmitted: 8,
      avgResponseTime: "1.8 days",
      lastActivity: "1 day ago",
    },
    candidatePipeline: {
      submitted: 8,
      underReview: 2,
      shortlisted: 4,
      interviewed: 2,
      offered: 0,
    },
  },
  {
    id: "JR-2025-003",
    title: "Data Scientist",
    hiringManager: "Dr. Emily Rodriguez",
    department: "Analytics",
    postedDate: "Apr 5, 2025",
    deadline: "Apr 20, 2025",
    status: "Offer Stage",
    priority: "High",
    progress: {
      stage: "Offer Release",
      percentage: 95,
      stages: [
        { name: "Job Posted", completed: true, date: "Apr 5" },
        { name: "Vendor Outreach", completed: true, date: "Apr 6" },
        { name: "Profile Submission", completed: true, date: "Apr 9" },
        { name: "Profile Review", completed: true, date: "Apr 12" },
        { name: "Interview Scheduling", completed: true, date: "Apr 16" },
        { name: "Offer Release", completed: false, date: "" },
        { name: "Onboarding", completed: false, date: "" },
      ],
    },
    vendorMetrics: {
      totalVendors: 6,
      respondedVendors: 6,
      profilesSubmitted: 15,
      avgResponseTime: "1.2 days",
      lastActivity: "3 hours ago",
    },
    candidatePipeline: {
      submitted: 15,
      underReview: 0,
      shortlisted: 6,
      interviewed: 3,
      offered: 1,
    },
  },
]

export default function TrackJobProgressPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  const filteredJobs = jobRequirements.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.hiringManager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800"
      case "Interview Phase":
        return "bg-yellow-100 text-yellow-800"
      case "Offer Stage":
        return "bg-green-100 text-green-800"
      case "On Hold":
        return "bg-gray-100 text-gray-800"
      case "Filled":
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

  const getVendorResponsivenessColor = (responseTime: string) => {
    const days = Number.parseFloat(responseTime)
    if (days <= 1) return "text-green-600"
    if (days <= 2) return "text-yellow-600"
    return "text-red-600"
  }

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline + ", 2025")
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title="Track Job Progress" description="Monitor job requirements status and vendor responsiveness" />

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by job title, hiring manager, or job ID..."
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="h-10 rounded-md border border-gray-200 px-3 py-2 text-sm min-w-[140px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="interview">Interview Phase</option>
          <option value="offer">Offer Stage</option>
        </select>
      </div>

      {/* Job Progress Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="p-6">
            {/* Job Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  <Badge className={getPriorityColor(job.priority)}>{job.priority}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{job.id}</span>
                  <span>HM: {job.hiringManager}</span>
                  <span>{job.department}</span>
                  <span>Posted: {job.postedDate}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{getDaysRemaining(job.deadline)} days remaining</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  {expandedJob === job.id ? "Hide Details" : "View Details"}
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Current Stage: {job.progress.stage}</span>
                <span className="text-sm text-gray-600">{job.progress.percentage}% Complete</span>
              </div>
              <Progress value={job.progress.percentage} className="h-3" />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{job.candidatePipeline.submitted}</div>
                <div className="text-sm text-gray-600">Profiles Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{job.candidatePipeline.shortlisted}</div>
                <div className="text-sm text-gray-600">Shortlisted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {job.vendorMetrics.respondedVendors}/{job.vendorMetrics.totalVendors}
                </div>
                <div className="text-sm text-gray-600">Vendor Response</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${getVendorResponsivenessColor(job.vendorMetrics.avgResponseTime)}`}
                >
                  {job.vendorMetrics.avgResponseTime}
                </div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedJob === job.id && (
              <div className="border-t pt-4">
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="vendors">Vendor Metrics</TabsTrigger>
                    <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline" className="space-y-4">
                    <div className="space-y-3">
                      {job.progress.stages.map((stage, index) => (
                        <div key={stage.name} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              stage.completed ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {stage.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${stage.completed ? "text-green-800" : "text-gray-600"}`}>
                                {stage.name}
                              </span>
                              {stage.date && <span className="text-sm text-gray-500">{stage.date}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="vendors" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{job.vendorMetrics.totalVendors}</div>
                        <div className="text-sm text-gray-600">Total Vendors</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{job.vendorMetrics.respondedVendors}</div>
                        <div className="text-sm text-gray-600">Responded</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{job.vendorMetrics.profilesSubmitted}</div>
                        <div className="text-sm text-gray-600">Profiles Submitted</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-sm text-gray-600 mb-1">Last Activity</div>
                        <div className="font-medium">{job.vendorMetrics.lastActivity}</div>
                      </Card>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Follow Up Vendors
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Send Reminder
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="pipeline" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{job.candidatePipeline.submitted}</div>
                        <div className="text-sm text-gray-600">Submitted</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{job.candidatePipeline.underReview}</div>
                        <div className="text-sm text-gray-600">Under Review</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{job.candidatePipeline.shortlisted}</div>
                        <div className="text-sm text-gray-600">Shortlisted</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{job.candidatePipeline.interviewed}</div>
                        <div className="text-sm text-gray-600">Interviewed</div>
                      </Card>
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-600">{job.candidatePipeline.offered}</div>
                        <div className="text-sm text-gray-600">Offered</div>
                      </Card>
                    </div>

                    <div className="flex gap-2">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Users className="h-4 w-4" />
                        View All Candidates
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Pipeline Report
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
