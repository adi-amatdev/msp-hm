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
import { FileTextIcon, PlusIcon, EditIcon, EyeIcon, FilterIcon, SearchIcon } from "lucide-react"

export default function JobRequestsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")
  const [department, setDepartment] = useState("all")
  const [showFilter, setShowFilter] = useState(false)
  const [showNewRequestForm, setShowNewRequestForm] = useState(false)

  const jobRequests = [
    {
      id: "JR-2024-001",
      title: "Senior React Developer",
      department: "Engineering",
      hiringManager: "John Manager",
      status: "Active",
      priority: "High",
      positions: 2,
      deadline: "2024-05-15",
      created: "2024-04-01",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
    },
    {
      id: "JR-2024-002",
      title: "DevOps Engineer",
      department: "Infrastructure",
      hiringManager: "Sarah Director",
      status: "Pending Approval",
      priority: "Medium",
      positions: 1,
      deadline: "2024-05-10",
      created: "2024-04-02",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    },
    {
      id: "JR-2024-003",
      title: "UX Designer",
      department: "Product Design",
      hiringManager: "Michael Brown",
      status: "Draft",
      priority: "Low",
      positions: 1,
      deadline: "2024-05-20",
      created: "2024-04-03",
      skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    },
  ]

  const filteredJobRequests = jobRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(search.toLowerCase()) ||
      request.hiringManager.toLowerCase().includes(search.toLowerCase()) ||
      request.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === "all" || request.status === status
    const matchesPriority = priority === "all" || request.priority === priority
    const matchesDepartment = department === "all" || request.department === department
    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="w-full min-h-screen bg-white p-4 md:p-6 space-y-6">
      <Header onToggleSidebar={() => setSidebarOpen(true)} />
      <PageHeader
        title="Job Request Management"
        description="Submit and track staffing requirements"
        action={
          <Button onClick={() => setShowNewRequestForm(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Job Request
          </Button>
        }
      />

      {showNewRequestForm ? (
        <Card>
          <CardHeader>
            <CardTitle>New Job Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g., Senior Frontend Developer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Required Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Textarea 
                  id="skills" 
                  placeholder="List required technical skills, certifications, and qualifications..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide detailed job description, responsibilities, and expectations..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Input type="date" id="timeline" />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-black text-white hover:bg-gray-800">Submit Job Request</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowNewRequestForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search job requests..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="select-content-menu">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent className="select-content-menu">
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="border border-gray-300 bg-white rounded-md h-11 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent className="select-content-menu">
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Product Design">Product Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Job Requests ({filteredJobRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredJobRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold">{request.id}</span>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                        </div>
                        <h3 className="text-xl font-medium">{request.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Department:</span>
                            <p className="font-medium">{request.department}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Hiring Manager:</span>
                            <p className="font-medium">{request.hiringManager}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Positions:</span>
                            <p className="font-medium">{request.positions}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Deadline:</span>
                            <p className="font-medium">{new Date(request.deadline).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {request.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>Created: {new Date(request.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <EditIcon className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}