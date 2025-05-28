"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DownloadIcon, UploadIcon, Search, FilterIcon, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// This would typically come from an API
const workOrders = [
  {
    workOrderId: "WO-2025-001",
    jobId: "JR-2025-001",
    candidateId: "LT",
    candidateName: "Lisa Thompson",
    position: "Project Manager",
    startDate: "May 10, 2025",
    endDate: "May 9, 2026",
    rate: "$105/hr",
    company: "TechCorp Inc.",
    status: "Pending Acceptance",
    documentCompletion: 0,
    category: "Management",
  },
  {
    workOrderId: "WO-2025-002",
    jobId: "JR-2025-002",
    candidateId: "RG",
    candidateName: "Robert Garcia",
    position: "Senior Software Engineer",
    startDate: "Apr 15, 2025",
    endDate: "Oct 14, 2025",
    rate: "$95/hr",
    company: "CloudSys Solutions",
    status: "Documents Pending",
    documentCompletion: 50,
    category: "Development",
  },
  {
    workOrderId: "WO-2025-003",
    jobId: "JR-2025-003",
    candidateId: "JL",
    candidateName: "Jennifer Lee",
    position: "Business Analyst",
    startDate: "Apr 1, 2025",
    endDate: "Mar 31, 2026",
    rate: "$90/hr",
    company: "DataViz Analytics",
    status: "Active",
    documentCompletion: 100,
    category: "Analysis",
  },
  {
    workOrderId: "WO-2025-004",
    jobId: "JR-2025-004",
    candidateId: "TW",
    candidateName: "Thomas Wilson",
    position: "Network Engineer",
    startDate: "Mar 15, 2025",
    endDate: "Sep 14, 2025",
    rate: "$85/hr",
    company: "TechCorp Inc.",
    status: "Extension Requested",
    documentCompletion: 100,
    category: "Infrastructure",
    extensionDetails: {
      requestDate: "Aug 20, 2025",
      duration: "6 months",
    },
  },
  {
    workOrderId: "WO-2025-005",
    jobId: "JR-2025-005",
    candidateId: "MK",
    candidateName: "Maria Kim",
    position: "Full Stack Developer",
    startDate: "Jun 1, 2025",
    endDate: "Dec 1, 2025",
    rate: "$88/hr",
    company: "TechStart Inc.",
    status: "Active",
    documentCompletion: 85,
    category: "Development",
  },
  {
    workOrderId: "WO-2025-006",
    jobId: "JR-2025-003",
    candidateId: "AS",
    candidateName: "Alex Smith",
    position: "Data Scientist",
    startDate: "May 15, 2025",
    endDate: "Nov 15, 2025",
    rate: "$102/hr",
    company: "DataViz Analytics",
    status: "Documents Pending",
    documentCompletion: 25,
    category: "Data Science",
  },
]

export default function WorkOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      "Pending Acceptance": false,
      "Documents Pending": false,
      Active: false,
      "Extension Requested": false,
    },
    category: {
      Management: false,
      Development: false,
      Analysis: false,
      Infrastructure: false,
      "Data Science": false,
    },
  })
  const [sortOrder, setSortOrder] = useState("newest")

  const filteredOrders = workOrders.filter((order) => {
    const matchesSearch =
      order.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.workOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.position.toLowerCase().includes(searchTerm.toLowerCase())

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive ? filters.status[order.status as keyof typeof filters.status] : true

    const categoryFiltersActive = Object.values(filters.category).some((value) => value)
    const matchesCategory = categoryFiltersActive
      ? filters.category[order.category as keyof typeof filters.category]
      : true

    return matchesSearch && matchesStatus && matchesCategory
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOrder === "newest") {
      return a.workOrderId > b.workOrderId ? -1 : 1
    } else if (sortOrder === "oldest") {
      return a.workOrderId < b.workOrderId ? -1 : 1
    }
    return 0
  })

  const toggleFilter = (category: "status" | "category", value: string) => {
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
        "Pending Acceptance": false,
        "Documents Pending": false,
        Active: false,
        "Extension Requested": false,
      },
      category: {
        Management: false,
        Development: false,
        Analysis: false,
        Infrastructure: false,
        "Data Science": false,
      },
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title="Work Orders" description="Manage and track work orders for your candidates" />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by name, work order ID, or position..."
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
              <h2 className="text-lg font-semibold text-blue-600">Filter Work Orders</h2>
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
          Showing {sortedOrders.length} of {workOrders.length} work orders
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOrders.map((order) => (
          <Card
            key={order.workOrderId}
            className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                  {order.candidateId}
                </div>
                <div>
                  <h3 className="font-semibold">{order.candidateName}</h3>
                  <p className="text-sm text-gray-500">{order.position}</p>
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Work Order ID:</span>
                <span className="font-medium">{order.workOrderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Job ID:</span>
                <span className="font-medium">{order.jobId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate:</span>
                <span className="font-medium">{order.rate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Company:</span>
                <span className="font-medium">{order.company}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Start Date:</span>
                <span className="font-medium">{order.startDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">End Date:</span>
                <span className="font-medium">{order.endDate}</span>
              </div>
            </div>

            {order.extensionDetails && (
              <div className="mb-4 p-3 bg-purple-50 rounded-md">
                <p className="text-sm font-medium text-purple-700">Extension Requested</p>
                <div className="mt-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Request Date:</span>
                    <span>{order.extensionDetails.requestDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{order.extensionDetails.duration}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Document Completion</span>
                <span className="text-sm font-medium">{order.documentCompletion}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-300"
                  style={{ width: `${order.documentCompletion}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {order.status === "Pending Acceptance" && (
                <>
                  <Button variant="outline" className="flex-1">
                    Decline
                  </Button>
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800">Accept</Button>
                </>
              )}

              {order.status === "Documents Pending" && (
                <>
                  <Button variant="outline" className="flex-1 gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </Button>
                  <Button className="flex-1 gap-2 bg-black text-white hover:bg-gray-800">
                    <UploadIcon className="h-4 w-4" />
                    Upload
                  </Button>
                </>
              )}

              {order.status === "Active" && (
                <>
                  <Button variant="outline" className="flex-1 gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </Button>
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800">View Details</Button>
                </>
              )}

              {order.status === "Extension Requested" && (
                <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
