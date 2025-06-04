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
  DollarSign, 
  Search, 
  FilterIcon, 
  X, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Receipt,
  CreditCard
} from "lucide-react"

export default function ExpensesPage() {
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
    type: {
      "Travel": false,
      "Accommodation": false,
      "Meals": false,
      "Equipment": false,
      "Software": false,
    },
  })

  // Mock data for pending expenses
  const pendingExpenses = [
    {
      id: "EXP-2024-001",
      contractor: "Jennifer Lee",
      position: "Business Analyst",
      type: "Travel",
      description: "Flight to client site",
      amount: 450.75,
      date: "Apr 5, 2024",
      submittedDate: "Apr 6, 2024",
      project: "DataViz Analytics",
      status: "Pending Approval",
      receiptUrl: "#",
    },
    {
      id: "EXP-2024-002",
      contractor: "Robert Garcia",
      position: "Senior Software Engineer",
      type: "Accommodation",
      description: "Hotel stay for conference",
      amount: 325.50,
      date: "Apr 3, 2024",
      submittedDate: "Apr 5, 2024",
      project: "CloudSys Solutions",
      status: "Pending Approval",
      receiptUrl: "#",
    },
    {
      id: "EXP-2024-003",
      contractor: "Thomas Wilson",
      position: "Network Engineer",
      type: "Meals",
      description: "Team lunch with client",
      amount: 120.25,
      date: "Apr 4, 2024",
      submittedDate: "Apr 5, 2024",
      project: "TechCorp Inc.",
      status: "Pending Approval",
      receiptUrl: "#",
    },
  ]

  // Mock data for expense history
  const expenseHistory = [
    {
      id: "EXP-2024-004",
      contractor: "Jennifer Lee",
      position: "Business Analyst",
      type: "Equipment",
      description: "External monitor purchase",
      amount: 299.99,
      date: "Mar 28, 2024",
      submittedDate: "Mar 29, 2024",
      approvedDate: "Apr 1, 2024",
      project: "DataViz Analytics",
      status: "Approved",
      receiptUrl: "#",
    },
    {
      id: "EXP-2024-005",
      contractor: "Robert Garcia",
      position: "Senior Software Engineer",
      type: "Software",
      description: "Development tool license",
      amount: 199.99,
      date: "Mar 25, 2024",
      submittedDate: "Mar 26, 2024",
      rejectedDate: "Mar 28, 2024",
      rejectionReason: "Software should be provided by client",
      project: "CloudSys Solutions",
      status: "Rejected",
      receiptUrl: "#",
    },
  ]

  const filteredExpenses = (activeTab === "pending" ? pendingExpenses : expenseHistory).filter((expense) => {
    const matchesSearch =
      expense.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.project.toLowerCase().includes(searchTerm.toLowerCase())

    // Only apply filters on the pending tab
    if (activeTab === "history") return matchesSearch

    const contractorFiltersActive = Object.values(filters.contractor).some((value) => value)
    const matchesContractor = contractorFiltersActive 
      ? filters.contractor[expense.contractor as keyof typeof filters.contractor] 
      : true

    const typeFiltersActive = Object.values(filters.type).some((value) => value)
    const matchesType = typeFiltersActive 
      ? filters.type[expense.type as keyof typeof filters.type]
      : true

    return matchesSearch && matchesContractor && matchesType
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

  const getExpenseTypeIcon = (type: string) => {
    switch (type) {
      case "Travel":
        return <CreditCard className="h-4 w-4 text-blue-500" />
      case "Accommodation":
        return <CreditCard className="h-4 w-4 text-purple-500" />
      case "Meals":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "Equipment":
        return <CreditCard className="h-4 w-4 text-orange-500" />
      case "Software":
        return <CreditCard className="h-4 w-4 text-indigo-500" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />
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
      type: {
        "Travel": false,
        "Accommodation": false,
        "Meals": false,
        "Equipment": false,
        "Software": false,
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
        title="Expense Management"
        description="Review and approve expense claims"
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
                placeholder="Search by contractor name, expense ID, or description..."
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
                  <h2 className="text-lg font-semibold text-blue-600">Filter Expenses</h2>
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
                    <h3 className="mb-3 font-medium text-blue-600">Expense Type</h3>
                    <div className="space-y-2">
                      {Object.keys(filters.type).map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`type-${type}`}
                            checked={filters.type[type as keyof typeof filters.type]}
                            onChange={() => toggleFilter("type", type)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`type-${type}`} className="text-blue-600">
                            {type}
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
              Showing {filteredExpenses.length} of {pendingExpenses.length} expenses
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExpenses.map((expense) => (
              <Card key={expense.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{expense.contractor}</h3>
                    <p className="text-sm text-gray-500">{expense.position}</p>
                  </div>
                  <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getExpenseTypeIcon(expense.type)}
                    <span className="font-medium">{expense.type}</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">${expense.amount.toFixed(2)}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4">{expense.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Date: {expense.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Submitted: {expense.submittedDate}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Project:</strong> {expense.project}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Expense ID:</strong> {expense.id}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Receipt className="h-4 w-4 mr-2" />
                    View Receipt
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center text-red-600">
                    <XCircle className="h-4 w-4" />
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
                placeholder="Search expense history..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {filteredExpenses.length} of {expenseHistory.length} expenses
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExpenses.map((expense) => (
              <Card key={expense.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{expense.contractor}</h3>
                    <p className="text-sm text-gray-500">{expense.position}</p>
                  </div>
                  <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getExpenseTypeIcon(expense.type)}
                    <span className="font-medium">{expense.type}</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">${expense.amount.toFixed(2)}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4">{expense.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Date: {expense.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Submitted: {expense.submittedDate}</span>
                  </div>
                  {expense.status === "Approved" && expense.approvedDate && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Approved: {expense.approvedDate}</span>
                    </div>
                  )}
                  {expense.status === "Rejected" && expense.rejectedDate && (
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Rejected: {expense.rejectedDate}</span>
                    </div>
                  )}
                </div>

                {expense.status === "Rejected" && expense.rejectionReason && (
                  <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <p className="text-sm text-red-700">
                        <strong>Rejection Reason:</strong> {expense.rejectionReason}
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