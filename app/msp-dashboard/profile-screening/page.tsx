"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, CheckCircle, XCircle, Clock, Star, User, FileText, Award, ChevronDown, ChevronUp } from "lucide-react"

// Mock data for candidate profiles with screening progress
const candidateProfiles = [
  {
    id: "CP-001",
    name: "Alex Johnson",
    vendor: "TechTalent Solutions",
    jobId: "JR-2025-001",
    jobTitle: "Senior React Developer",
    submittedDate: "Apr 14, 2025",
    status: "Under Review",
    screeningProgress: 75,
    validationSteps: {
      skillsAlignment: { status: "completed", score: 9, notes: "Excellent React and TypeScript skills" },
      experienceLevel: { status: "completed", score: 8, notes: "6 years experience matches requirement" },
      rateValidation: { status: "completed", score: 7, notes: "$92/hr within budget range" },
      availabilityCheck: { status: "pending", score: 0, notes: "" },
      documentVerification: { status: "not_started", score: 0, notes: "" },
    },
    profile: {
      experience: "6 years",
      currentRate: "$92/hr",
      location: "Remote",
      availability: "Immediate",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      summary: "Experienced React developer with strong background in building scalable web applications...",
    },
  },
  {
    id: "CP-002",
    name: "Maria Rodriguez",
    vendor: "Elite Contractors",
    jobId: "JR-2025-003",
    jobTitle: "Data Scientist",
    submittedDate: "Apr 14, 2025",
    status: "Shortlisted",
    screeningProgress: 100,
    validationSteps: {
      skillsAlignment: { status: "completed", score: 10, notes: "Perfect match for ML and Python requirements" },
      experienceLevel: { status: "completed", score: 9, notes: "8 years experience exceeds requirement" },
      rateValidation: { status: "completed", score: 8, notes: "$108/hr slightly above budget but justified" },
      availabilityCheck: { status: "completed", score: 7, notes: "Available in 2 weeks" },
      documentVerification: { status: "completed", score: 9, notes: "All documents verified" },
    },
    profile: {
      experience: "8 years",
      currentRate: "$108/hr",
      location: "Remote",
      availability: "2 weeks",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      summary: "Senior data scientist with expertise in machine learning and statistical analysis...",
    },
  },
  {
    id: "CP-003",
    name: "Robert Kim",
    vendor: "CloudExperts Inc.",
    jobId: "JR-2025-002",
    jobTitle: "DevOps Engineer",
    submittedDate: "Apr 13, 2025",
    status: "Rejected",
    screeningProgress: 60,
    validationSteps: {
      skillsAlignment: { status: "completed", score: 6, notes: "Good AWS skills but lacks Kubernetes experience" },
      experienceLevel: { status: "completed", score: 5, notes: "5 years experience is borderline" },
      rateValidation: { status: "completed", score: 9, notes: "$96/hr within budget" },
      availabilityCheck: { status: "not_started", score: 0, notes: "" },
      documentVerification: { status: "not_started", score: 0, notes: "" },
    },
    profile: {
      experience: "5 years",
      currentRate: "$96/hr",
      location: "Hybrid",
      availability: "1 week",
      skills: ["AWS", "Docker", "Jenkins", "Python"],
      summary: "DevOps engineer with strong experience in cloud infrastructure...",
    },
  },
]

export default function ProfileScreeningPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

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
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Shortlisted":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getValidationIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "not_started":
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const renderStars = (score: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < score ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const toggleCard = (id: string) => {
    const newExpandedCards = new Set(expandedCards)
    if (expandedCards.has(id)) {
      newExpandedCards.delete(id)
    } else {
      newExpandedCards.add(id)
    }
    setExpandedCards(newExpandedCards)
  }

  const isCardExpanded = (id: string) => expandedCards.has(id)

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title="Profile Screening" description="Review and validate candidate profiles submitted by vendors" />

      <div className="space-y-4">
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
            <option value="review">Under Review</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Candidate Cards */}
        <div className="space-y-3">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="space-y-2">
              <Card className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.vendor}</p>
                  </div>
                  <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                </div>

                <p className="text-sm font-medium mb-1">{candidate.jobTitle}</p>
                <p className="text-sm text-gray-600 mb-2">{candidate.jobId}</p>

                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Screening Progress</span>
                    <span>{candidate.screeningProgress}%</span>
                  </div>
                  <Progress value={candidate.screeningProgress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Submitted: {candidate.submittedDate}</div>
                  <Button size="sm" variant="ghost" onClick={() => toggleCard(candidate.id)}>
                    {isCardExpanded(candidate.id) ? (
                      <>
                        Collapse <ChevronUp className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Expand <ChevronDown className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {isCardExpanded(candidate.id) && (
                <Card className="p-6">
                  <Tabs defaultValue="validation" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="validation">Validation Steps</TabsTrigger>
                      <TabsTrigger value="profile">Profile Details</TabsTrigger>
                      <TabsTrigger value="actions">Actions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="validation" className="space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">{candidate.name}</h2>
                          <p className="text-gray-600">{candidate.jobTitle}</p>
                          <p className="text-sm text-gray-500">Submitted by {candidate.vendor}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                          <div className="mt-2">
                            <Progress value={candidate.screeningProgress} className="w-32" />
                            <p className="text-sm text-gray-500 mt-1">{candidate.screeningProgress}% Complete</p>
                          </div>
                        </div>
                      </div>

                      {/* Validation Steps */}
                      <div className="space-y-4">
                        {Object.entries(candidate.validationSteps).map(([key, step]) => (
                          <Card key={key} className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {getValidationIcon(step.status)}
                                <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
                              </div>
                              {step.status === "completed" && (
                                <div className="flex items-center gap-1">
                                  {renderStars(step.score)}
                                  <span className="text-sm font-medium ml-1">{step.score}/10</span>
                                </div>
                              )}
                            </div>

                            {step.notes && <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{step.notes}</p>}

                            {step.status === "pending" && (
                              <div className="mt-3 flex gap-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-6">
                      {/* Profile Information */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium">{candidate.profile.experience}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">$</span>
                          <div>
                            <p className="text-sm text-gray-500">Rate</p>
                            <p className="font-medium">{candidate.profile.currentRate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{candidate.profile.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Availability</p>
                            <p className="font-medium">{candidate.profile.availability}</p>
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div>
                        <h3 className="font-semibold mb-2">Professional Summary</h3>
                        <p className="text-gray-700">{candidate.profile.summary}</p>
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {candidate.profile.skills.map((skill) => (
                            <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="actions" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button className="gap-2 bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4" />
                          Shortlist Candidate
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Request Documents
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <User className="h-4 w-4" />
                          Contact Vendor
                        </Button>
                        <Button variant="outline" className="gap-2 text-red-600 border-red-600">
                          <XCircle className="h-4 w-4" />
                          Reject Profile
                        </Button>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Screening Notes</h3>
                        <textarea
                          className="w-full p-3 border rounded-md"
                          rows={4}
                          placeholder="Add your screening notes and feedback..."
                        />
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Screening Results</Button>
                    </TabsContent>
                  </Tabs>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
