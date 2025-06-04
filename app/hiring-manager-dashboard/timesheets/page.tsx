"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Clock, 
  Search, 
  FilterIcon, 
  X, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from "lucide-react"

export default function TimesheetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")
  const [filters, setFilters] = useState({
    contractor: {
      "Jennifer Lee": false,
      "Robert Garcia": false,
      "Thomas Wilson": false,
    },
    week: {
      "Current Week": false,
      "Previous Week": false,
      "Two Weeks Ago": false,
    },
  })

  // Mock data for pending timesheets
  const pendingTimesheets = [
    {
      id: "TS-2024-001",
      contractor: "Jennifer Lee",
      position: "Business Analyst",
      period: "Apr 1 - Apr 7, 2024",
      submittedDate: "Apr 8, 2024",
      hours: {
        regular: 40,
        overtime: 5,
        total: 45
      },
      project: "DataViz Analytics",
      status: "Pending Approval",
    },
    {
      id: "TS-2024-002",
      contractor: "Robert Garcia",
      position: "Senior Software Engineer",
      period: "Apr 1 - Apr 7, 2024",
      submittedDate: "Apr 8, 2024",
      hours: {
        regular: 38,
        overtime: 0,
        total: 38
      },
      project: "CloudSys Solutions",
      status: "Pending Approval",
    },
    {
      id: "TS-2024-003",
      contractor: "Thomas Wilson",
      position: "Network Engineer",
      period: "Apr 1 - Apr 7, 2024",
      submittedDate: "Apr 9, 2024",
      hours: {
        regular: 40,
        overtime: 2,
        total: 42
      },
      project: "TechCorp Inc.",
      status: "Pending Approval",
    },
  ]

  // Mock data for timesheet history
  const timesheetHistory = [
    {
      id: "TS-2024-004",
      contractor: "Jennifer Lee",
      position: "Business Analyst",
      period: "Mar 25 - Mar 31, 2024",
      submittedDate: "Apr 1, 2024",
      approvedDate: "Apr 2, 2024",
      hours: {
        regular: 40,
        overtime: 0,
        total: 40
      },
      project: "DataViz Analytics",
      status: "Approved",
    },
    {
      id: "TS-2024-005",
      contractor: "Robert Garcia",
      position: "Senior Software Engineer",
      period: "Mar 25 - Mar 31, 2024",
      submittedDate: "Apr 1, 2024",
      rejectedDate: "Apr 2, 2024",
      rejectionReason: "Hours don't match project records",
      hours: {
        regular: 42,
        overtime: 3,
        total: 45
      },
      project: "CloudSys Solutions",
      status: "Rejected",
    },
  ]

  const filteredTimesheets = (activeTab === "pending" ? pendingTimesheets : timesheetHistory).filter((timesheet) => {
    const matchesSearch =
      timesheet.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timesheet.project.toLowerCase().includes(searchTerm.toLowerCase())

    // Only apply filters on the pending tab
    if (activeTab === "history") return matchesSearch

    const contractorFiltersActive = Object.values(filters.contractor).some((value) => value)
    const matchesContractor = contractorFiltersActive 
      ? filters.contractor[timesheet.contractor as keyof typeof filters.contractor] 
      : true

    // Simple week matching based on period
    const weekFiltersActive = Object.values(filters.week).some((value) => value)
    const matchesWeek = weekFiltersActive 
      ? Object.keys(filters.week).some(week => 
          filters.week[week as keyof typeof filters.week] && timesheet.period.includes("Apr"))
      : true

    return matchesSearch && matchesContractor && matchesWeek
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      contractor: {
        "Jennifer Lee": false,
        "Robert Garcia": false,
        "Thomas Wilson": false,
      },
      week: {
        "Current Week": false,
        "Previous Week": false,
        "Two Weeks Ago": false,
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
        title="Timesheet Management"
        description="Review and approve submitted timesheets hello hello"
      />

      <Tabs defaultValue="pending" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search by contractor name, timesheet ID, or project..."
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
                  <h2 className="text-lg font-semibold text-blue-600">Filter Timesheets</h2>
                  <button onClick={() => setShowFilter(false)}>
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-medium text-blue-600">Contractor</h3>
                    <div className="space-y-2">
                      {Object.keys(filters.contractor).map((contractor) => (
                        <div key={contractor} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`contractor-${contractor}`}
                            checked={filters.contractor[contractor as keyof typeof filters.contractor]}
                            onChange={() => toggleFilter("contractor", contractor)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`contractor-${contractor}`} className="text-blue-600">
                            {contractor}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-medium text-blue-600">Time Period</h3>
                    <div className="space-y-2">
                      {Object.keys(filters.week).map((week) => (
                        <div key={week} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`week-${week}`}
                            checked={filters.week[week as keyof typeof filters.week]}
                            onChange={() => toggleFilter("week", week)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`week-${week}`} className="text-blue-600">
                            {week}
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
              Showing {filteredTimesheets.length} of {pendingTimesheets.length} timesheets
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTimesheets.map((timesheet) => (
              <Card key={timesheet.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{timesheet.contractor}</h3>
                    <p className="text-sm text-gray-500">{timesheet.position}</p>
                  </div>
                  <Badge className={getStatusColor(timesheet.status)}>{timesheet.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Period: {timesheet.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Submitted: {timesheet.submittedDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
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
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-lg">{timesheet.hours.total}</p>
                    <p className="text-xs text-gray-400">hours</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Project:</strong> {timesheet.project}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Timesheet ID:</strong> {timesheet.id}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search timesheet history..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {filteredTimesheets.length} of {timesheetHistory.length} timesheets
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTimesheets.map((timesheet) => (
              <Card key={timesheet.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{timesheet.contractor}</h3>
                    <p className="text-sm text-gray-500">{timesheet.position}</p>
                  </div>
                  <Badge className={getStatusColor(timesheet.status)}>{timesheet.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Period: {timesheet.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Submitted: {timesheet.submittedDate}</span>
                  </div>
                  {timesheet.status === "Approved" && timesheet.approvedDate && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Approved: {timesheet.approvedDate}</span>
                    </div>
                  )}
                  {timesheet.status === "Rejected" && timesheet.rejectedDate && (
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Rejected: {timesheet.rejectedDate}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
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
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-lg">{timesheet.hours.total}</p>
                    <p className="text-xs text-gray-400">hours</p>
                  </div>
                </div>

                {timesheet.status === "Rejected" && timesheet.rejectionReason && (
                  <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <p className="text-sm text-red-700">
                        <strong>Rejection Reason:</strong> {timesheet.rejectionReason}
                      </p>
                    </div>
                  </div>
                )}

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