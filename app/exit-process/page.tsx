"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, FilterIcon, X, UserX, ClipboardCheck, FileCheck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// This would typically come from an API
const exitProcesses = [
  {
    id: "EXIT-2025-001",
    candidate: {
      id: "JL",
      name: "Jennifer Lee",
      position: "Business Analyst",
    },
    workOrder: "WO-2025-003",
    company: "DataViz Analytics",
    status: "In Progress",
    startDate: "Apr 15, 2025",
    endDate: "Apr 30, 2025",
    category: "Analysis",
    steps: [
      { name: "Exit Interview", status: "Completed", date: "Apr 16, 2025" },
      { name: "Equipment Return", status: "Pending", date: null },
      { name: "Access Revocation", status: "Not Started", date: null },
    ],
  },
  {
    id: "EXIT-2025-002",
    candidate: {
      id: "RG",
      name: "Robert Garcia",
      position: "Senior Software Engineer",
    },
    workOrder: "WO-2025-002",
    company: "CloudSys Solutions",
    status: "Completed",
    startDate: "Apr 1, 2025",
    endDate: "Apr 15, 2025",
    category: "Development",
    steps: [
      { name: "Exit Interview", status: "Completed", date: "Apr 2, 2025" },
      { name: "Equipment Return", status: "Completed", date: "Apr 14, 2025" },
      { name: "Access Revocation", status: "Completed", date: "Apr 15, 2025" },
    ],
  },
  {
    id: "EXIT-2025-003",
    candidate: {
      id: "TW",
      name: "Thomas Wilson",
      position: "Network Engineer",
    },
    workOrder: "WO-2025-004",
    company: "TechCorp Inc.",
    status: "Scheduled",
    startDate: "May 1, 2025",
    endDate: "May 15, 2025",
    category: "Infrastructure",
    steps: [
      { name: "Exit Interview", status: "Not Started", date: null },
      { name: "Equipment Return", status: "Not Started", date: null },
      { name: "Access Revocation", status: "Not Started", date: null },
    ],
  },
]

export default function ExitProcessPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      Scheduled: false,
      "In Progress": false,
      Completed: false,
    },
    category: {
      Analysis: false,
      Development: false,
      Infrastructure: false,
      Management: false,
    },
  })
  const [sortOrder, setSortOrder] = useState("newest")

  const filteredProcesses = exitProcesses.filter((process) => {
    const matchesSearch =
      process.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.workOrder.toLowerCase().includes(searchTerm.toLowerCase())

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive ? filters.status[process.status as keyof typeof filters.status] : true

    const categoryFiltersActive = Object.values(filters.category).some((value) => value)
    const matchesCategory = categoryFiltersActive
      ? filters.category[process.category as keyof typeof filters.category]
      : true

    return matchesSearch && matchesStatus && matchesCategory
  })

  const sortedProcesses = [...filteredProcesses].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
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
        Scheduled: false,
        "In Progress": false,
        Completed: false,
      },
      category: {
        Analysis: false,
        Development: false,
        Infrastructure: false,
        Management: false,
      },
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  const getStepIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <FileCheck className="h-4 w-4 text-green-500" />
      case "in progress":
        return <ClipboardCheck className="h-4 w-4 text-blue-500" />
      default:
        return <UserX className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Exit Process"
        description="Manage contractor exit processes and offboarding"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Exit Process
          </Button>
        }
      />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by name, exit process ID, or work order..."
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
          </select>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Filter Exit Processes</h2>
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
          Showing {sortedProcesses.length} of {exitProcesses.length} exit processes
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProcesses.map((process) => (
          <Card key={process.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                  {process.candidate.id}
                </div>
                <div>
                  <h3 className="font-semibold">{process.candidate.name}</h3>
                  <p className="text-sm text-gray-500">{process.candidate.position}</p>
                </div>
              </div>
              <StatusBadge status={process.status} />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Exit Process ID:</span>
                <span className="font-medium">{process.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Start Date:</span>
                <span className="font-medium">{process.startDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">End Date:</span>
                <span className="font-medium">{process.endDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Work Order:</span>
                <span className="font-medium">{process.workOrder}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Company:</span>
                <span className="font-medium">{process.company}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-gray-700">Exit Process Steps</h4>
              {process.steps.map((step, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getStepIcon(step.status)}
                    <span>{step.name}</span>
                  </div>
                  <span className="text-gray-500">{step.date || "Not Started"}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}