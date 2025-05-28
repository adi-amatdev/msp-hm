"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPinIcon, UsersIcon, FilterIcon, Search, ChevronDown, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// This would typically come from an API
const jobRequirements = [
  {
    id: "JR-2025-001",
    title: "Senior React Developer",
    description:
      "We are looking for a Senior React Developer with 5+ years of experience in building complex web applications. The ideal candidate should have strong knowledge of React, Redux, and modern JavaScript.",
    location: "New York, NY (Remote)",
    positions: 2,
    rate: "$85-95/hr",
    status: "Active",
    deadline: "Apr 15, 2025",
    skills: ["React", "Redux", "TypeScript", "JavaScript", "Node.js"],
    profilesSubmitted: 4,
    locationType: "Remote",
    experienceLevel: "Senior",
    category: "Development",
  },
  {
    id: "JR-2025-002",
    title: "DevOps Engineer",
    description:
      "Seeking a DevOps Engineer to help build and maintain our cloud infrastructure. The candidate should have experience with AWS, Docker, Kubernetes, and CI/CD pipelines.",
    location: "Chicago, IL (Hybrid)",
    positions: 1,
    rate: "$90-100/hr",
    status: "Active",
    deadline: "Apr 10, 2025",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    profilesSubmitted: 2,
    locationType: "Hybrid",
    experienceLevel: "Mid-level",
    category: "DevOps",
  },
  {
    id: "JR-2025-003",
    title: "Data Scientist",
    description:
      "Looking for a Data Scientist with expertise in machine learning and statistical analysis. The candidate should have experience with Python, R, and big data technologies.",
    location: "San Francisco, CA (Remote)",
    positions: 3,
    rate: "$95-110/hr",
    status: "Active",
    deadline: "Apr 20, 2025",
    skills: ["Python", "R", "Machine Learning", "SQL", "TensorFlow"],
    profilesSubmitted: 6,
    locationType: "Remote",
    experienceLevel: "Senior",
    category: "Data Science",
  },
  {
    id: "JR-2025-004",
    title: "UX/UI Designer",
    description:
      "We need a UX/UI Designer with a strong portfolio and experience in designing user-centered interfaces. The candidate should be proficient in Figma, Sketch, and Adobe Creative Suite.",
    location: "Austin, TX (Onsite)",
    positions: 1,
    rate: "$75-85/hr",
    status: "Active",
    deadline: "Apr 12, 2025",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping"],
    profilesSubmitted: 3,
    locationType: "Onsite",
    experienceLevel: "Mid-level",
    category: "Design",
  },
  {
    id: "JR-2025-005",
    title: "Full Stack Developer",
    description:
      "Seeking a Full Stack Developer with experience in both frontend and backend technologies. The candidate should be proficient in React, Node.js, and database management.",
    location: "Boston, MA (Hybrid)",
    positions: 2,
    rate: "$80-90/hr",
    status: "Active",
    deadline: "Apr 25, 2025",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    profilesSubmitted: 2,
    locationType: "Hybrid",
    experienceLevel: "Mid-level",
    category: "Development",
  },
]

export default function JobRequirementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    locationType: {
      Remote: false,
      Hybrid: false,
      Onsite: false,
    },
    experienceLevel: {
      Junior: false,
      "Mid-level": false,
      Senior: false,
    },
    category: {
      Development: false,
      DevOps: false,
      "Data Science": false,
      Design: false,
    },
  })
  const [sortOrder, setSortOrder] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")

  // Filter jobs based on search term and filters
  const filteredJobs = jobRequirements.filter((job) => {
    // Search filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Location type filter
    const locationTypeFiltersActive = Object.values(filters.locationType).some((value) => value)
    const matchesLocationType = locationTypeFiltersActive
      ? filters.locationType[job.locationType as keyof typeof filters.locationType]
      : true

    // Experience level filter
    const experienceLevelFiltersActive = Object.values(filters.experienceLevel).some((value) => value)
    const matchesExperienceLevel = experienceLevelFiltersActive
      ? filters.experienceLevel[job.experienceLevel as keyof typeof filters.experienceLevel]
      : true

    // Category filter
    const categoryFiltersActive = Object.values(filters.category).some((value) => value)
    const matchesCategory = categoryFiltersActive
      ? filters.category[job.category as keyof typeof filters.category]
      : true

    return matchesSearch && matchesLocationType && matchesExperienceLevel && matchesCategory
  })

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "newest") {
      return a.id > b.id ? -1 : 1
    } else if (sortOrder === "oldest") {
      return a.id < b.id ? -1 : 1
    } else if (sortOrder === "deadline") {
      return new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
    }
    return 0
  })

  // Toggle filter
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value as keyof (typeof prev)[category]],
      },
    }))
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      locationType: {
        Remote: false,
        Hybrid: false,
        Onsite: false,
      },
      experienceLevel: {
        Junior: false,
        "Mid-level": false,
        Senior: false,
      },
      category: {
        Development: false,
        DevOps: false,
        "Data Science": false,
        Design: false,
      },
    })
  }

  // Count active filters
  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Job Requirements"
        description="View and manage active job requirements for your organization"
      />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by job title or ID..."
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilter(true)}>
            <FilterIcon className="h-4 w-4" />
            Filter
            <ChevronDown className="h-4 w-4" />
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
            <option value="deadline">Deadline</option>
          </select>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Filter Job Requirements</h2>
              <button onClick={() => setShowFilter(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-medium text-blue-600">Location Type</h3>
                <div className="space-y-2">
                  {Object.keys(filters.locationType).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${type}`}
                        checked={filters.locationType[type as keyof typeof filters.locationType]}
                        onCheckedChange={() => toggleFilter("locationType", type)}
                      />
                      <Label htmlFor={`location-${type}`} className="text-blue-600">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-blue-600">Experience Level</h3>
                <div className="space-y-2">
                  {Object.keys(filters.experienceLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`experience-${level}`}
                        checked={filters.experienceLevel[level as keyof typeof filters.experienceLevel]}
                        onCheckedChange={() => toggleFilter("experienceLevel", level)}
                      />
                      <Label htmlFor={`experience-${level}`} className="text-blue-600">
                        {level}
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

      {/* View Toggle and Results Count */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-0 border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`rounded-r-none ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-black border-r"}`}
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={`rounded-l-none ${viewMode === "list" ? "bg-black text-white" : "bg-white text-black"}`}
          >
            List View
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Showing {sortedJobs.length} of {jobRequirements.length} job requirements
        </div>
      </div>

      {/* Results */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedJobs.map((job) => (
            <Card key={job.id} className="p-6 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.id}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{job.status}</span>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UsersIcon className="h-4 w-4" />
                  <span>
                    {job.positions} position{job.positions > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{job.skills.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm text-gray-500">Rate</div>
                  <div className="font-semibold">{job.rate}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Due: {job.deadline}</div>
                  <div className="text-sm text-gray-600">{job.profilesSubmitted} profiles submitted</div>
                </div>
              </div>

              <Link href={`/job-requirements/${job.id}`}>
                <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">View Details</Button>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Positions</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell className="text-center">{job.positions}</TableCell>
                  <TableCell>{job.rate}</TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{job.status}</span>
                  </TableCell>
                  <TableCell>{job.deadline}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/job-requirements/${job.id}`}>
                      <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
