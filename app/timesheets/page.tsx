"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Search, FilterIcon, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// This would typically come from an API
const timesheets = [
  {
    id: "TS-2025-002",
    candidate: {
      id: "JL",
      name: "Jennifer Lee",
      position: "Business Analyst",
    },
    period: {
      start: "Apr 3",
      end: "Apr 9, 2025",
    },
    hours: {
      total: 42,
      regular: 40,
      overtime: 2,
    },
    workOrder: "WO-2025-003",
    company: "DataViz Analytics",
    status: "Pending Approval",
    submitted: "Apr 10, 2025",
    category: "Analysis",
  },
  {
    id: "TS-2025-005",
    candidate: {
      id: "RG",
      name: "Robert Garcia",
      position: "Senior Software Engineer",
    },
    period: {
      start: "Apr 10",
      end: "Apr 16, 2025",
    },
    hours: {
      total: 0,
      regular: 0,
      overtime: 0,
    },
    workOrder: "WO-2025-002",
    company: "CloudSys Solutions",
    status: "Draft",
    lastUpdated: "Apr 15, 2025",
    category: "Development",
  },
  {
    id: "TS-2025-003",
    candidate: {
      id: "LT",
      name: "Lisa Thompson",
      position: "Project Manager",
    },
    period: {
      start: "Apr 17",
      end: "Apr 23, 2025",
    },
    hours: {
      total: 45,
      regular: 40,
      overtime: 5,
    },
    workOrder: "WO-2025-001",
    company: "TechCorp Inc.",
    status: "Approved",
    submitted: "Apr 24, 2025",
    category: "Management",
  },
  {
    id: "TS-2025-004",
    candidate: {
      id: "TW",
      name: "Thomas Wilson",
      position: "Network Engineer",
    },
    period: {
      start: "Apr 24",
      end: "Apr 30, 2025",
    },
    hours: {
      total: 38,
      regular: 38,
      overtime: 0,
    },
    workOrder: "WO-2025-004",
    company: "TechCorp Inc.",
    status: "Submitted",
    submitted: "May 1, 2025",
    category: "Infrastructure",
  },
  {
    id: "TS-2025-006",
    candidate: {
      id: "MK",
      name: "Maria Kim",
      position: "Full Stack Developer",
    },
    period: {
      start: "May 1",
      end: "May 7, 2025",
    },
    hours: {
      total: 40,
      regular: 40,
      overtime: 0,
    },
    workOrder: "WO-2025-005",
    company: "TechStart Inc.",
    status: "Draft",
    lastUpdated: "May 6, 2025",
    category: "Development",
  },
]

export default function TimesheetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      Draft: false,
      Submitted: false,
      "Pending Approval": false,
      Approved: false,
      Rejected: false,
    },
    category: {
      Analysis: false,
      Development: false,
      Management: false,
      Infrastructure: false,
    },
  })
  const [sortOrder, setSortOrder] = useState("current")

  const filteredTimesheets = timesheets.filter((timesheet) => {
    const matchesSearch =
      timesheet.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.workOrder.toLowerCase().includes(searchTerm.toLowerCase())

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive ? filters.status[timesheet.status as keyof typeof filters.status] : true

    const categoryFiltersActive = Object.values(filters.category).some((value) => value)
    const matchesCategory = categoryFiltersActive
      ? filters.category[timesheet.category as keyof typeof filters.category]
      : true

    return matchesSearch && matchesStatus && matchesCategory
  })

  const sortedTimesheets = [...filteredTimesheets].sort((a, b) => {
    if (sortOrder === "current") {
      return a.id > b.id ? -1 : 1
    } else if (sortOrder === "previous") {
      return a.id < b.id ? -1 : 1
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
        Draft: false,
        Submitted: false,
        "Pending Approval": false,
        Approved: false,
        Rejected: false,
      },
      category: {
        Analysis: false,
        Development: false,
        Management: false,
        Infrastructure: false,
      },
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Timesheets"
        description="Manage and submit timesheets for your contractors"
        action={{
          label: "Create New Timesheet",
        }}
      />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by name, timesheet ID, or work order..."
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
            <option value="current">Current Period</option>
            <option value="previous">Previous Period</option>
            <option value="all">All Periods</option>
          </select>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Filter Timesheets</h2>
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
          Showing {sortedTimesheets.length} of {timesheets.length} timesheets
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTimesheets.map((timesheet) => (
          <Card key={timesheet.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                  {timesheet.candidate.id}
                </div>
                <div>
                  <h3 className="font-semibold">{timesheet.candidate.name}</h3>
                  <p className="text-sm text-gray-500">{timesheet.candidate.position}</p>
                </div>
              </div>
              <StatusBadge status={timesheet.status} />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Period: {timesheet.period.start} - {timesheet.period.end}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold text-lg">{timesheet.hours.total}</p>
                <p className="text-xs text-gray-400">hours</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Regular</p>
                <p className="font-bold text-lg">{timesheet.hours.regular}</p>
                <p className="text-xs text-gray-400">hours</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Overtime</p>
                <p className="font-bold text-lg">{timesheet.hours.overtime}</p>
                <p className="text-xs text-gray-400">hours</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Timesheet ID:</span>
                <span className="font-medium">{timesheet.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Work Order:</span>
                <span className="font-medium">{timesheet.workOrder}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Company:</span>
                <span className="font-medium">{timesheet.company}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{timesheet.status === "Draft" ? "Last Updated:" : "Submitted:"}</span>
                <span className="font-medium">{timesheet.submitted || timesheet.lastUpdated}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {timesheet.status === "Draft" ? (
                <>
                  <Button variant="outline" className="flex-1">
                    Save Draft
                  </Button>
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800">Submit</Button>
                </>
              ) : (
                <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
