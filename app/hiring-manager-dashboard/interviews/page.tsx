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
  Video, 
  User, 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  CheckCircle, 
  PlusIcon 
} from "lucide-react"

export default function InterviewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock data for upcoming interviews
  const upcomingInterviews = [
    {
      id: "INT-001",
      candidateName: "Michael Johnson",
      position: "Senior React Developer",
      jobId: "JR-2024-001",
      date: "2024-04-15",
      time: "10:00 AM",
      duration: "45 minutes",
      type: "Video Call",
      status: "Confirmed",
      interviewers: ["John Manager", "Tech Lead"],
      meetingLink: "https://meet.google.com/abc-def-ghi",
    },
    {
      id: "INT-002",
      candidateName: "Sarah Williams",
      position: "UX/UI Designer",
      jobId: "JR-2024-003",
      date: "2024-04-16",
      time: "2:00 PM",
      duration: "60 minutes",
      type: "In-person",
      status: "Scheduled",
      interviewers: ["Michael Brown", "Design Director"],
      location: "Conference Room A",
    },
    {
      id: "INT-003",
      candidateName: "David Chen",
      position: "DevOps Engineer",
      jobId: "JR-2024-002",
      date: "2024-04-18",
      time: "11:30 AM",
      duration: "45 minutes",
      type: "Video Call",
      status: "Pending Confirmation",
      interviewers: ["Sarah Director"],
      meetingLink: "https://zoom.us/j/123456789",
    },
  ]

  // Mock data for interview feedback
  const interviewFeedback = [
    {
      id: "FB-001",
      candidateName: "Emily Rodriguez",
      position: "Data Scientist",
      jobId: "JR-2024-005",
      interviewDate: "2024-04-01",
      status: "Hired",
      feedback: "Strong technical skills and great cultural fit. Highly recommended.",
      rating: 5,
      interviewers: ["John Manager", "Data Science Lead"],
      strengths: ["Technical knowledge", "Problem solving", "Communication"],
      weaknesses: ["Limited experience with our specific tech stack"],
    },
    {
      id: "FB-002",
      candidateName: "James Wilson",
      position: "Frontend Developer",
      jobId: "JR-2024-004",
      interviewDate: "2024-03-28",
      status: "Rejected",
      feedback: "Lacks experience in key areas. Not a good fit for this role at this time.",
      rating: 2,
      interviewers: ["Sarah Director", "Tech Lead"],
      strengths: ["Enthusiasm", "Willingness to learn"],
      weaknesses: ["Technical skills", "Problem solving approach"],
    },
  ]

  const filteredData = (activeTab === "upcoming" ? upcomingInterviews : interviewFeedback).filter((item) => {
    return item.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jobId.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Pending Confirmation":
        return "bg-yellow-100 text-yellow-800"
      case "Hired":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderRating = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      )
    }
    return <div className="flex">{stars}</div>
  }

  return (
    <main className="w-full min-h-screen bg-white p-4 md:p-6 space-y-6">
      <Header onToggleSidebar={() => setSidebarOpen(true)} />
      <PageHeader
        title="Interview Management"
        description="Schedule interviews and provide feedback"
        action={
          activeTab === "upcoming" && (
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          )
        }
      />

      <Tabs defaultValue="upcoming" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="feedback">Interview Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search by candidate name, position, or job ID..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {filteredData.length} of {upcomingInterviews.length} interviews
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((interview) => (
              <Card key={interview.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{interview.candidateName}</h3>
                    <p className="text-sm text-gray-500">{interview.position}</p>
                  </div>
                  <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{new Date(interview.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{interview.time} ({interview.duration})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {interview.type === "Video Call" ? (
                      <Video className="h-4 w-4 text-gray-500" />
                    ) : (
                      <User className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="text-sm">{interview.type}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Job ID:</strong> {interview.jobId}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Interviewers:</strong> {interview.interviewers.join(", ")}
                  </p>
                  {interview.meetingLink && (
                    <p className="text-sm text-blue-600 truncate">
                      <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                        Meeting Link
                      </a>
                    </p>
                  )}
                  {interview.location && (
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {interview.location}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {interview.status === "Confirmed" && (
                    <>
                      <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                    </>
                  )}
                  
                  {interview.status === "Scheduled" && (
                    <>
                      <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                    </>
                  )}
                  
                  {interview.status === "Pending Confirmation" && (
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      View Details
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search feedback..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing {filteredData.length} of {interviewFeedback.length} feedback entries
            </div>
          </div>

          {/* Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((feedback) => (
              <Card key={feedback.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{feedback.candidateName}</h3>
                    <p className="text-sm text-gray-500">{feedback.position}</p>
                  </div>
                  <Badge className={getStatusColor(feedback.status)}>{feedback.status}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Job ID:</span>
                    <span className="font-medium">{feedback.jobId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Interview Date:</span>
                    <span className="font-medium">{new Date(feedback.interviewDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Interviewers:</span>
                    <span className="font-medium">{feedback.interviewers.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rating:</span>
                    <span className="font-medium">{renderRating(feedback.rating)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Feedback:</strong> {feedback.feedback}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Strengths:</p>
                      <ul className="text-xs text-gray-700 list-disc list-inside">
                        {feedback.strengths?.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Areas for Improvement:</p>
                      <ul className="text-xs text-gray-700 list-disc list-inside">
                        {feedback.weaknesses?.map((weakness, index) => (
                          <li key={index}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                  <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center">
                    <ThumbsDown className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}