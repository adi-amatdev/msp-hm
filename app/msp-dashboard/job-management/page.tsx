"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Edit, Users } from "lucide-react"
import Link from "next/link"

// Mock data for job posts
const jobPosts = [
  {
    id: "JR-2025-001",
    title: "Senior React Developer",
    client: "TechCorp Inc.",
    hiringManager: "Jennifer Smith",
    status: "Active",
    priority: "High",
    positions: 2,
    billRate: "$85-95/hr",
    skillsRequired: ["React", "TypeScript", "Node.js"],
    profilesReceived: 8,
    profilesShortlisted: 3,
    interviewsScheduled: 2,
    createdDate: "Mar 28, 2025",
    deadline: "Apr 15, 2025",
    vendorsInvited: 5,
    vendorsResponded: 3,
  },
  {
    id: "JR-2025-002",
    title: "DevOps Engineer",
    client: "CloudSys Solutions",
    hiringManager: "Michael Chen",
    status: "Active",
    priority: "Medium",
    positions: 1,
    billRate: "$90-100/hr",
    skillsRequired: ["AWS", "Docker", "Kubernetes"],
    profilesReceived: 4,
    profilesShortlisted: 2,
    interviewsScheduled: 1,
    createdDate: "Mar 30, 2025",
    deadline: "Apr 10, 2025",
    vendorsInvited: 4,
    vendorsResponded: 2,
  },
  {
    id: "JR-2025-003",
    title: "Data Scientist",
    client: "DataViz Analytics",
    hiringManager: "Dr. Emily Rodriguez",
    status: "Interview Phase",
    priority: "High",
    positions: 3,
    billRate: "$95-110/hr",
    skillsRequired: ["Python", "Machine Learning", "SQL"],
    profilesReceived: 12,
    profilesShortlisted: 6,
    interviewsScheduled: 4,
    createdDate: "Mar 25, 2025",
    deadline: "Apr 20, 2025",
    vendorsInvited: 6,
    vendorsResponded: 4,
  },
  {
    id: "JR-2025-004",
    title: "UX/UI Designer",
    client: "DesignCorp",
    hiringManager: "Lisa Thompson",
    status: "Offer Released",
    priority: "Low",
    positions: 1,
    billRate: "$75-85/hr",
    skillsRequired: ["Figma", "User Research", "Prototyping"],
    profilesReceived: 6,
    profilesShortlisted: 2,
    interviewsScheduled: 2,
    createdDate: "Mar 20, 2025",
    deadline: "Apr 12, 2025",
    vendorsInvited: 3,
    vendorsResponded: 3,
  },
]

export default function JobManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredJobs = jobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Interview Phase":
        return "bg-blue-100 text-blue-800"
      case "Offer Released":
        return "bg-purple-100 text-purple-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
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
        title="Job Management"
        description="Create and manage job postings for hiring managers"
        action={{
          label: "Create Job Post",
        }}
      />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by job title, ID, or client..."
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
            <option value="active">Active</option>
            <option value="interview">Interview Phase</option>
            <option value="offer">Offer Released</option>
            <option value="closed">Closed</option>
          </select>

          <Link href="/msp-dashboard/job-management/create">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Create Job Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  {job.id} • {job.client}
                </p>
                <p className="text-sm text-gray-600">HM: {job.hiringManager}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                <Badge variant="outline" className={getPriorityColor(job.priority)}>
                  {job.priority}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Positions</p>
                <p className="font-medium">{job.positions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bill Rate</p>
                <p className="font-medium">{job.billRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{job.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{job.createdDate}</p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-3">Job Progress</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Vendors Invited</span>
                    <span className="font-medium">{job.vendorsInvited}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Vendors Responded</span>
                    <span className="font-medium">{job.vendorsResponded}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Profiles Received</span>
                    <span className="font-medium">{job.profilesReceived}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Shortlisted</span>
                    <span className="font-medium">{job.profilesShortlisted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interviews</span>
                    <span className="font-medium">{job.interviewsScheduled}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {job.skillsRequired.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link href={`/msp-dashboard/job-management/${job.id}`} className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </Link>
              <Link href={`/msp-dashboard/job-management/${job.id}/edit`} className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Link href={`/msp-dashboard/candidate-review?jobId=${job.id}`} className="flex-1">
                <Button className="w-full gap-2 bg-black text-white hover:bg-gray-800">
                  <Users className="h-4 w-4" />
                  Review Profiles
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
