"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Download, Calendar, CheckCircle, XCircle, Clock, User, Briefcase, MapPin } from "lucide-react"

// Mock data for candidate profiles
const candidateProfiles = [
  {
    id: "CP-001",
    name: "Alex Johnson",
    vendor: "TechTalent Solutions",
    jobId: "JR-2025-001",
    jobTitle: "Senior React Developer",
    submittedDate: "Apr 14, 2025",
    status: "New",
    rating: 0,
    experience: "6 years",
    currentRate: "$92/hr",
    location: "Remote",
    availability: "Immediate",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    summary: "Experienced React developer with strong background in building scalable web applications...",
    education: "BS Computer Science",
    previousRoles: ["Senior Developer at StartupXYZ", "Full Stack Developer at TechCorp"],
    vendorNotes: "Top performer, excellent communication skills",
    resumeUrl: "#",
    portfolioUrl: "#",
  },
  {
    id: "CP-002",
    name: "Maria Rodriguez",
    vendor: "Elite Contractors",
    jobId: "JR-2025-003",
    jobTitle: "Data Scientist",
    submittedDate: "Apr 14, 2025",
    status: "Under Review",
    rating: 4,
    experience: "8 years",
    currentRate: "$108/hr",
    location: "Remote",
    availability: "2 weeks",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    summary: "Senior data scientist with expertise in machine learning and statistical analysis...",
    education: "PhD in Data Science",
    previousRoles: ["Lead Data Scientist at DataCorp", "ML Engineer at AI Solutions"],
    vendorNotes: "PhD holder, published researcher",
    resumeUrl: "#",
    portfolioUrl: "#",
  },
  {
    id: "CP-003",
    name: "Robert Kim",
    vendor: "CloudExperts Inc.",
    jobId: "JR-2025-002",
    jobTitle: "DevOps Engineer",
    submittedDate: "Apr 13, 2025",
    status: "Shortlisted",
    rating: 5,
    experience: "5 years",
    currentRate: "$96/hr",
    location: "Hybrid",
    availability: "1 week",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    summary: "DevOps engineer with strong experience in cloud infrastructure and automation...",
    education: "MS Computer Engineering",
    previousRoles: ["DevOps Engineer at CloudTech", "System Admin at Infrastructure Inc"],
    vendorNotes: "AWS certified, excellent problem solver",
    resumeUrl: "#",
    portfolioUrl: "#",
  },
]

export default function CandidateReviewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidateProfiles)[0] | null>(null)

  const filteredCandidates = candidateProfiles.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.vendor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || candidate.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Shortlisted":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Candidate Profile Screening"
        description="Review and screen candidate profiles submitted by vendors"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search and Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search candidates..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full h-10 rounded-md border border-gray-200 px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Candidate Cards */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredCandidates.map((candidate) => (
              <Card
                key={candidate.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedCandidate?.id === candidate.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.vendor}</p>
                  </div>
                  <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                </div>

                <p className="text-sm font-medium mb-1">{candidate.jobTitle}</p>
                <p className="text-sm text-gray-600 mb-2">{candidate.jobId}</p>

                <div className="flex items-center gap-2 mb-2">
                  {renderStars(candidate.rating)}
                  <span className="text-sm text-gray-500">({candidate.rating}/5)</span>
                </div>

                <div className="text-xs text-gray-500">Submitted: {candidate.submittedDate}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Candidate Details */}
        <div className="lg:col-span-2">
          {selectedCandidate ? (
            <Card className="p-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="screening">Screening</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                      <p className="text-gray-600">{selectedCandidate.jobTitle}</p>
                      <p className="text-sm text-gray-500">Submitted by {selectedCandidate.vendor}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(selectedCandidate.status)}>{selectedCandidate.status}</Badge>
                      <div className="flex items-center gap-1 mt-2">{renderStars(selectedCandidate.rating)}</div>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium">{selectedCandidate.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">$</span>
                      <div>
                        <p className="text-sm text-gray-500">Rate</p>
                        <p className="font-medium">{selectedCandidate.currentRate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{selectedCandidate.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Availability</p>
                        <p className="font-medium">{selectedCandidate.availability}</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Professional Summary</h3>
                    <p className="text-gray-700">{selectedCandidate.summary}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="font-semibold mb-2">Previous Roles</h3>
                    <ul className="space-y-1">
                      {selectedCandidate.previousRoles.map((role, index) => (
                        <li key={index} className="text-gray-700">
                          • {role}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vendor Notes */}
                  <div>
                    <h3 className="font-semibold mb-2">Vendor Notes</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedCandidate.vendorNotes}</p>
                  </div>
                </TabsContent>

                <TabsContent value="screening" className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Screening Checklist</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Skills alignment with job requirements</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Experience level matches requirement</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Rate within budget range</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Availability aligns with start date</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Screening Notes</h3>
                    <textarea
                      className="w-full p-3 border rounded-md"
                      rows={4}
                      placeholder="Add your screening notes here..."
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Overall Rating</h3>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <button key={i} className="p-1">
                          <Star className="h-6 w-6 text-gray-300 hover:text-yellow-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Resume</p>
                        <p className="text-sm text-gray-500">PDF Document</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Portfolio</p>
                        <p className="text-sm text-gray-500">External Link</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Portfolio
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Cover Letter</p>
                        <p className="text-sm text-gray-500">PDF Document</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="gap-2 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4" />
                      Shortlist Candidate
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <User className="h-4 w-4" />
                      Request More Info
                    </Button>
                    <Button variant="outline" className="gap-2 text-red-600 border-red-600">
                      <XCircle className="h-4 w-4" />
                      Reject Candidate
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Action Notes</h3>
                    <textarea
                      className="w-full p-3 border rounded-md"
                      rows={3}
                      placeholder="Add notes about your decision..."
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Candidate</h3>
              <p className="text-gray-500">
                Choose a candidate from the list to view their profile and start screening.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
