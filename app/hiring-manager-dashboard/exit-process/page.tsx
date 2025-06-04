"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar, 
  Search, 
  FilterIcon, 
  X, 
  CheckCircle, 
  UserX, 
  FileCheck,
  PlusIcon
} from "lucide-react"

export default function ExitProcessPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [showNewExitForm, setShowNewExitForm] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      "Scheduled": false,
      "In Progress": false,
      "Completed": false,
    },
    reason: {
      "Project Completion": false,
      "Performance Issues": false,
      "Budget Constraints": false,
      "Other": false,
    },
  })

  // Mock data for exit processes
  const exitProcesses = [
    {
      id: "EXIT-2024-001",
      worker: {
        name: "John Smith",
        position: "Senior Frontend Developer",
        id: "JS",
      },
      workOrder: "WO-2024-001",
      company: "TechCorp Inc.",
      status: "In Progress",
      startDate: "Apr 15, 2024",
      endDate: "Apr 30, 2024",
      reason: "Project Completion",
      steps: [
        { name: "Exit Interview", status: "Completed", date: "Apr 16, 2024" },
        { name: "Equipment Return", status: "Pending", date: null },
        { name: "Access Revocation", status: "Not Started", date: null },
      ],
    },
    {
      id: "EXIT-2024-002",
      worker: {
        name: "Sarah Johnson",
        position: "Full Stack Developer",
        id: "SJ",
      },
      workOrder: "WO-2024-002",
      company: "CloudSys Solutions",
      status: "Scheduled",
      startDate: "May 1, 2024",
      endDate: "May 15, 2024",
      reason: "Budget Constraints",
      steps: [
        { name: "Exit Interview", status: "Not Started", date: null },
        { name: "Equipment Return", status: "Not Started", date: null },
        { name: "Access Revocation", status: "Not Started", date: null },
      ],
    },
    {
      id: "EXIT-2024-003",
      worker: {
        name: "Michael Brown",
        position: "DevOps Engineer",
        id: "MB",
      },
      workOrder: "WO-2024-003",
      company: "DataViz Analytics",
      status: "Completed",
      startDate: "Apr 1, 2024",
      endDate: "Apr 15, 2024",
      reason: "Performance Issues",
      steps: [
        { name: "Exit Interview", status: "Completed", date: "Apr 2, 2024" },
        { name: "Equipment Return", status: "Completed", date: "Apr 14, 2024" },
        { name: "Access Revocation", status: "Completed", date: "Apr 15, 2024" },
      ],
    },
  ]

  const filteredProcesses = exitProcesses.filter((process) => {
    const matchesSearch =
      process.worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.company.toLowerCase().includes(searchTerm.toLowerCase())

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive 
      ? filters.status[process.status as keyof typeof filters.status] 
      : true

    const reasonFiltersActive = Object.values(filters.reason).some((value) => value)
    const matchesReason = reasonFiltersActive 
      ? filters.reason[process.reason as keyof typeof filters.reason]
      : true

    return matchesSearch && matchesStatus && matchesReason
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Pending":
        return <FileCheck className="h-4 w-4 text-yellow-500" />
      case "Not Started":
        return <UserX className="h-4 w-4 text-gray-400" />
      default:
        return <UserX className="h-4 w-4 text-gray-400" />
    }
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
        "Scheduled": false,
        "In Progress": false,
        "Completed": false,
      },
      reason: {
        "Project Completion": false,
        "Performance Issues": false,
        "Budget Constraints": false,
        "Other": false,
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
        title="Exit Process Management"
        description="Initiate and manage worker deboarding process"
        action={
          <Button className="bg-transparent" onClick={() => setShowNewExitForm(!showNewExitForm)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            {showNewExitForm ? "Cancel" : "Initiate Exit Process"}
          </Button>
        }
      />

      {showNewExitForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Initiate Exit Process</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="worker">Select Worker</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a worker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith - Senior Frontend Developer</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson - Full Stack Developer</SelectItem>
                    <SelectItem value="michael-brown">Michael Brown - DevOps Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Exit Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-completion">Project Completion</SelectItem>
                    <SelectItem value="performance">Performance Issues</SelectItem>
                    <SelectItem value="budget">Budget Constraints</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-day">Last Working Day</Label>
                <Input type="date" id="last-day" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional information..." />
              </div>

              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Initiate Exit Process</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
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
                    <h3 className="mb-3 font-medium text-blue-600">Exit Reason</h3>
                    <div className="space-y-2">
                      {Object.keys(filters.reason).map((reason) => (
                        <div key={reason} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`reason-${reason}`}
                            checked={filters.reason[reason as keyof typeof filters.reason]}
                            onChange={() => toggleFilter("reason", reason)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`reason-${reason}`} className="text-blue-600">
                            {reason}
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
              Showing {filteredProcesses.length} of {exitProcesses.length} exit processes
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProcesses.map((process) => (
              <Card key={process.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                      {process.worker.id}
                    </div>
                    <div>
                      <h3 className="font-semibold">{process.worker.name}</h3>
                      <p className="text-sm text-gray-500">{process.worker.position}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(process.status)}>{process.status}</Badge>
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Exit Reason:</span>
                    <span className="font-medium">{process.reason}</span>
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
        </>
      )}
    </main>
  )
}