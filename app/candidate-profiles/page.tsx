"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, FilterIcon, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// This would typically come from an API
const candidateProfiles = [
  {
    id: "MJ",
    name: "Michael Johnson",
    position: "Senior React Developer",
    jobId: "JR-2025-001",
    status: "Submitted",
    skills: ["React", "Redux", "TypeScript", "Node.js"],
    experience: "7 years",
    rate: "$90/hr",
    submittedDate: "Apr 1, 2025",
    availability: "Immediate",
    location: "Remote",
    category: "Development",
  },
  {
    id: "SW",
    name: "Sarah Williams",
    position: "DevOps Engineer",
    jobId: "JR-2025-002",
    status: "Shortlisted",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    experience: "5 years",
    rate: "$95/hr",
    submittedDate: "Apr 2, 2025",
    availability: "2 weeks",
    location: "Hybrid",
    category: "DevOps",
  },
  {
    id: "DC",
    name: "David Chen",
    position: "Data Scientist",
    jobId: "JR-2025-003",
    status: "Interview",
    skills: ["Python", "R", "Machine Learning", "SQL"],
    experience: "6 years",
    rate: "$100/hr",
    submittedDate: "Apr 3, 2025",
    availability: "1 week",
    location: "Remote",
    category: "Data Science",
  },
  {
    id: "ER",
    name: "Emily Rodriguez",
    position: "UX/UI Designer",
    jobId: "JR-2025-004",
    status: "Interviewed",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
    experience: "4 years",
    rate: "$85/hr",
    submittedDate: "Apr 4, 2025",
    availability: "Immediate",
    location: "Onsite",
    category: "Design",
  },
  {
    id: "JW",
    name: "James Wilson",
    position: "Full Stack Developer",
    jobId: "JR-2025-005",
    status: "Rejected",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    experience: "5 years",
    rate: "$88/hr",
    submittedDate: "Apr 5, 2025",
    availability: "2 weeks",
    location: "Hybrid",
    category: "Development",
  },
  {
    id: "LT",
    name: "Lisa Thompson",
    position: "Project Manager",
    jobId: "JR-2025-001",
    status: "Work Order Created",
    skills: ["Agile", "Scrum", "JIRA", "Confluence"],
    experience: "8 years",
    rate: "$105/hr",
    submittedDate: "Apr 6, 2025",
    availability: "1 month",
    location: "Remote",
    category: "Management",
  },
]

export default function CandidateProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      Submitted: false,
      Shortlisted: false,
      Interview: false,
      Interviewed: false,
      Rejected: false,
      "Work Order Created": false,
    },
    location: {
      Remote: false,
      Hybrid: false,
      Onsite: false,
    },
    category: {
      Development: false,
      DevOps: false,
      "Data Science": false,
      Design: false,
      Management: false,
    },
  })
  const [sortOrder, setSortOrder] = useState("newest")

  // Filter candidates based on search term and filters
  const filteredCandidates = candidateProfiles.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobId.toLowerCase().includes(searchTerm.toLowerCase())

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive ? filters.status[candidate.status as keyof typeof filters.status] : true

    const locationFiltersActive = Object.values(filters.location).some((value) => value)
    const matchesLocation = locationFiltersActive
      ? filters.location[candidate.location as keyof typeof filters.location]
      : true

    const categoryFiltersActive = Object.values(filters.category).some((value) => value)
    const matchesCategory = categoryFiltersActive
      ? filters.category[candidate.category as keyof typeof filters.category]
      : true

    return matchesSearch && matchesStatus && matchesLocation && matchesCategory
  })

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime()
    } else if (sortOrder === "rate") {
      return Number.parseInt(b.rate.replace(/\D/g, "")) - Number.parseInt(a.rate.replace(/\D/g, ""))
    }
    return 0
  })

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
        Submitted: false,
        Shortlisted: false,
        Interview: false,
        Interviewed: false,
        Rejected: false,
        "Work Order Created": false,
      },
      location: {
        Remote: false,
        Hybrid: false,
        Onsite: false,
      },
      category: {
        Development: false,
        DevOps: false,
        "Data Science": false,
        Design: false,
        Management: false,
      },
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title="Candidate Profiles" description="Manage and track your submitted candidate profiles" />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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

          <select
            className="h-10 rounded-md border border-gray-200 px-3 py-2 text-sm min-w-[140px]"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rate">Rate (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Filter Candidates</h2>
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
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.status[status as keyof typeof filters.status]}
                        onCheckedChange={() => toggleFilter("status", status)}
                      />
                      <Label htmlFor={`status-${status}`} className="text-blue-600">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-blue-600">Location</h3>
                <div className="space-y-2">
                  {Object.keys(filters.location).map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.location[location as keyof typeof filters.location]}
                        onCheckedChange={() => toggleFilter("location", location)}
                      />
                      <Label htmlFor={`location-${location}`} className="text-blue-600">
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-blue-600">Category</h3>
                <div className="space-y-2">
                  {Object.keys(filters.category).map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.category[category as keyof typeof filters.category]}
                        onCheckedChange={() => toggleFilter("category", category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-blue-600">
                        {category}
                      </Label>
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
          Showing {sortedCandidates.length} of {candidateProfiles.length} candidates
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCandidates.map((candidate) => (
          <Card key={candidate.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                  {candidate.id}
                </div>
                <div>
                  <h3 className="font-semibold">{candidate.name}</h3>
                  <p className="text-sm text-gray-500">{candidate.position}</p>
                </div>
              </div>
              <StatusBadge status={candidate.status} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium">{candidate.experience}</p>
              </div>
              <div>
                <p className="text-gray-500">Rate</p>
                <p className="font-medium">{candidate.rate}</p>
              </div>
              <div>
                <p className="text-gray-500">Job ID</p>
                <p className="font-medium">{candidate.jobId}</p>
              </div>
              <div>
                <p className="text-gray-500">Submitted</p>
                <p className="font-medium">{candidate.submittedDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-4">
              <div>
                <p className="text-gray-500">Availability</p>
                <p className="font-medium">{candidate.availability}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{candidate.location}</p>
              </div>
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
