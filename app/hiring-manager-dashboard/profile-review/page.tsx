"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserIcon, StarIcon, CheckCircleIcon, XCircleIcon, SearchIcon, FilterIcon, X } from "lucide-react"

export default function ProfileReviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      "Pending Review": false,
      "Shortlisted": false,
      "Rejected": false,
    },
    jobRole: {
      "Developer": false,
      "Designer": false,
      "DevOps": false,
      "Data Scientist": false,
    },
  })
  const [activeTab, setActiveTab] = useState("pending")

  // Mock data for candidate profiles
  const candidateProfiles = [
    {
      id: "CP-001",
      name: "Michael Johnson",
      position: "Senior React Developer",
      jobId: "JR-2024-001",
      status: "Pending Review",
      submittedDate: "2024-04-05",
      vendor: "TechTalent Solutions",
      experience: "7 years",
      skills: ["React", "Redux", "TypeScript", "Node.js"],
      rating: 0,
    },
    {
      id: "CP-002",
      name: "Sarah Williams",
      position: "UX/UI Designer",
      jobId: "JR-2024-003",
      status: "Shortlisted",
      submittedDate: "2024-04-04",
      vendor: "Design Professionals",
      experience: "5 years",
      skills: ["Figma", "User Research", "Prototyping", "UI Design"],
      rating: 4,
    },
    {
      id: "CP-003",
      name: "David Chen",
      position: "DevOps Engineer",
      jobId: "JR-2024-002",
      status: "Rejected",
      submittedDate: "2024-04-03",
      vendor: "CloudExperts Inc.",
      experience: "4 years",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      rating: 2,
    },
  ]

  const historyProfiles = [
    {
      id: "CP-004",
      name: "Emily Rodriguez",
      position: "Data Scientist",
      jobId: "JR-2024-005",
      status: "Hired",
      submittedDate: "2024-03-15",
      reviewedDate: "2024-03-20",
      vendor: "DataTech Solutions",
      experience: "6 years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      rating: 5,
    },
    {
      id: "CP-005",
      name: "James Wilson",
      position: "Frontend Developer",
      jobId: "JR-2024-004",
      status: "Rejected",
      submittedDate: "2024-03-10",
      reviewedDate: "2024-03-15",
      vendor: "TechTalent Solutions",
      experience: "3 years",
      skills: ["JavaScript", "React", "CSS", "HTML"],
      rating: 2,
    },
  ]

  const filteredProfiles = (activeTab === "pending" ? candidateProfiles : historyProfiles).filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.jobId.toLowerCase().includes(searchTerm.toLowerCase())

    // Only apply filters on the pending tab
    if (activeTab === "history") return matchesSearch

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive ? filters.status[profile.status as keyof typeof filters.status] : true

    // Simple job role matching based on position
    const jobRoleFiltersActive = Object.values(filters.jobRole).some((value) => value)
    const matchesJobRole = jobRoleFiltersActive 
      ? Object.keys(filters.jobRole).some(role => 
          filters.jobRole[role as keyof typeof filters.jobRole] && profile.position.includes(role))
      : true

    return matchesSearch && matchesStatus && matchesJobRole
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Shortlisted":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Hired":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value as keyof (typeof prev)[category]],
      },
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: {
        "Pending Review": false,
        "Shortlisted": false,
        "Rejected": false,
      },
      jobRole: {
        "Developer": false,
        "Designer": false,
        "DevOps": false,
        "Data Scientist": false,
      },
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  return (
    <main className="w-full min-h-screen bg-white p-4 md:p-6 space-y-6">
      <Header onToggleSidebar={() => setSidebarOpen(true)} />
      <PageHeader
        title="Profile Review"
        description="Review and evaluate candidate profiles"
      />

      <Tabs defaultValue="pending" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search by name, position, or job ID..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilter(true)}>
                <FilterIcon className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Modal */}
          {showFilter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-600">Filter Profiles</h2>
                  <button onClick={() => setShowFilter(false)}>
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-medium text-blue-600">Status</h3>
                    <div className="space-y-2">
                      {Object.keys(filters.status).map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`status-${status}`}
                            checked={filters.status[status as keyof typeof filters.status]}
                            onChange={() => toggleFilter("status", status)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`status-${status}`} className="text-blue-600">
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-medium text-blue-600">Job Role</h3>
                    <div className="space-y-2">
                      {Object.keys(filters.jobRole).map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`role-${role}`}
                            checked={filters.jobRole[role as keyof typeof filters.jobRole]}
                            onChange={() => toggleFilter("jobRole", role)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`role-${role}`} className="text-blue-600">
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={resetFilters} className="text-blue-600 border-blue-600">
                    Reset Filters
                  </Button>
                  <Button onClick={() => setShowFilter(false)} className="bg-blue-600 hover:bg-blue-700">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {filteredProfiles.length} of {candidateProfiles.length} profiles
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                      {profile.name.charAt(0)}{profile.name.split(' ')[1]?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-gray-500">{profile.position}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(profile.status)}>{profile.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Job ID:</span>
                    <span className="font-medium">{profile.jobId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Vendor:</span>
                    <span className="font-medium">{profile.vendor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Experience:</span>
                    <span className="font-medium">{profile.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="font-medium">{new Date(profile.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Rating:</span>
                    <div className="flex">{renderStars(profile.rating)}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2 bg-black text-white hover:bg-gray-800">
                    <UserIcon className="h-4 w-4" />
                    View Profile
                  </Button>
                  {profile.status === "Pending Review" && (
                    <div className="flex gap-2">
                      <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center">
                        <XCircleIcon className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          {/* Search Bar for History */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search review history..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {filteredProfiles.length} of {historyProfiles.length} profiles
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                      {profile.name.charAt(0)}{profile.name.split(' ')[1]?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{profile.name}</h3>
                      <p className="text-sm text-gray-500">{profile.position}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(profile.status)}>{profile.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Job ID:</span>
                    <span className="font-medium">{profile.jobId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Vendor:</span>
                    <span className="font-medium">{profile.vendor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="font-medium">{new Date(profile.submittedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Reviewed:</span>
                    <span className="font-medium">{new Date(profile.reviewedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Rating:</span>
                    <div className="flex">{renderStars(profile.rating)}</div>
                  </div>
                </div>

                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}