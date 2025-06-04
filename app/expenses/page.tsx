"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BriefcaseIcon, LandmarkIcon, PlaneIcon, UtensilsIcon, WrenchIcon, Search, FilterIcon, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// This would typically come from an API
const expenses = [
  {
    id: "EXP-2025-001",
    candidate: {
      id: "JL",
      name: "Jennifer Lee",
      position: "Business Analyst",
    },
    type: "Travel",
    description: "Client site visit - airfare",
    amount: 250.75,
    date: "Apr 5, 2025",
    workOrder: "WO-2025-003",
    company: "DataViz Analytics",
    status: "Approved",
    category: "Analysis",
    approvedBy: {
      name: "David Wilson",
      date: "Apr 8, 2025",
    },
  },
  {
    id: "EXP-2025-002",
    candidate: {
      id: "JL",
      name: "Jennifer Lee",
      position: "Business Analyst",
    },
    type: "Accommodation",
    description: "Hotel stay for client visit",
    amount: 125.5,
    date: "Apr 5, 2025",
    workOrder: "WO-2025-003",
    company: "DataViz Analytics",
    status: "Pending Approval",
    category: "Analysis",
  },
  {
    id: "EXP-2025-003",
    candidate: {
      id: "TW",
      name: "Thomas Wilson",
      position: "Network Engineer",
    },
    type: "Meals",
    description: "Team lunch with client",
    amount: 75.25,
    date: "Apr 3, 2025",
    workOrder: "WO-2025-004",
    company: "TechCorp Inc.",
    status: "Approved",
    category: "Infrastructure",
    approvedBy: {
      name: "Michael Brown",
      date: "Apr 7, 2025",
    },
  },
  {
    id: "EXP-2025-004",
    candidate: {
      id: "TW",
      name: "Thomas Wilson",
      position: "Network Engineer",
    },
    type: "Equipment",
    description: "Network testing equipment rental",
    amount: 350.0,
    date: "Apr 10, 2025",
    workOrder: "WO-2025-004",
    company: "TechCorp Inc.",
    status: "Rejected",
    category: "Infrastructure",
    rejectedBy: {
      name: "Michael Brown",
      date: "Apr 12, 2025",
      reason: "Equipment should be provided by client",
    },
  },
  {
    id: "EXP-2025-005",
    candidate: {
      id: "RG",
      name: "Robert Garcia",
      position: "Senior Software Engineer",
    },
    type: "Software",
    description: "Development tool license",
    amount: 199.99,
    date: "Apr 15, 2025",
    workOrder: "WO-2025-002",
    company: "CloudSys Solutions",
    status: "Draft",
    category: "Development",
  },
  {
    id: "EXP-2025-006",
    candidate: {
      id: "LT",
      name: "Lisa Thompson",
      position: "Project Manager",
    },
    type: "Travel",
    description: "Conference attendance - flight and registration",
    amount: 450.0,
    date: "Apr 20, 2025",
    workOrder: "WO-2025-001",
    company: "TechCorp Inc.",
    status: "Submitted",
    category: "Management",
  },
]

export default function ExpensesPage() {
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
    type: {
      Travel: false,
      Accommodation: false,
      Meals: false,
      Equipment: false,
      Software: false,
    },
    category: {
      Analysis: false,
      Infrastructure: false,
      Development: false,
      Management: false,
    },
  })
  const [sortOrder, setSortOrder] = useState("newest")

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())

    const statusFiltersActive = Object.values(filters.status).some((value) => value)
    const matchesStatus = statusFiltersActive ? filters.status[expense.status as keyof typeof filters.status] : true

    const typeFiltersActive = Object.values(filters.type).some((value) => value)
    const matchesType = typeFiltersActive ? filters.type[expense.type as keyof typeof filters.type] : true

    const categoryFiltersActive = Object.values(filters.category).some((value) => value)
    const matchesCategory = categoryFiltersActive
      ? filters.category[expense.category as keyof typeof filters.category]
      : true

    return matchesSearch && matchesStatus && matchesType && matchesCategory
  })

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortOrder === "amount") {
      return b.amount - a.amount
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
      type: {
        Travel: false,
        Accommodation: false,
        Meals: false,
        Equipment: false,
        Software: false,
      },
      category: {
        Analysis: false,
        Infrastructure: false,
        Development: false,
        Management: false,
      },
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterCategory) => {
    return count + Object.values(filterCategory).filter(Boolean).length
  }, 0)

  const getExpenseIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "travel":
        return <PlaneIcon className="h-4 w-4" />
      case "accommodation":
        return <LandmarkIcon className="h-4 w-4" />
      case "meals":
        return <UtensilsIcon className="h-4 w-4" />
      case "equipment":
        return <WrenchIcon className="h-4 w-4" />
      case "software":
        return <BriefcaseIcon className="h-4 w-4" />
      default:
        return <BriefcaseIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Expenses"
        description="Manage and submit expense claims for your contractors"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700">
            Submit New Expense
          </Button>
        }
      />

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search by name, expense ID, or description..."
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
            <option value="amount">Amount (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-600">Filter Expenses</h2>
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
                <h3 className="mb-3 font-medium text-blue-600">Type</h3>
                <div className="space-y-2">
                  {Object.keys(filters.type).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.type[type as keyof typeof filters.type]}
                        onCheckedChange={() => toggleFilter("type", type)}
                      />
                      <Label htmlFor={`type-${type}`} className="text-blue-600">
                        {type}
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
          Showing {sortedExpenses.length} of {expenses.length} expenses
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedExpenses.map((expense) => (
          <Card key={expense.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 font-semibold">
                  {expense.candidate.id}
                </div>
                <div>
                  <h3 className="font-semibold">{expense.candidate.name}</h3>
                  <p className="text-sm text-gray-500">{expense.candidate.position}</p>
                </div>
              </div>
              <StatusBadge status={expense.status} />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getExpenseIcon(expense.type)}
                <span className="font-medium">{expense.type}</span>
              </div>
              <span className="text-xl font-bold text-green-600">${expense.amount.toFixed(2)}</span>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{expense.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Expense ID:</span>
                <span className="font-medium">{expense.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{expense.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Work Order:</span>
                <span className="font-medium">{expense.workOrder}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Company:</span>
                <span className="font-medium">{expense.company}</span>
              </div>
            </div>

            {expense.status === "Approved" && expense.approvedBy && (
              <div className="mb-4 p-2 bg-green-50 rounded-md">
                <p className="text-xs text-green-600">
                  Approved on {expense.approvedBy.date} by {expense.approvedBy.name}
                </p>
              </div>
            )}

            {expense.status === "Rejected" && expense.rejectedBy && (
              <div className="mb-4 p-2 bg-red-50 rounded-md">
                <p className="text-xs text-red-600">
                  Rejected on {expense.rejectedBy.date} by {expense.rejectedBy.name}
                </p>
                <p className="text-xs text-red-600">Reason: {expense.rejectedBy.reason}</p>
              </div>
            )}

            <Button className="w-full bg-black text-white hover:bg-gray-800">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}