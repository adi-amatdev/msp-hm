"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, UsersIcon, CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react"

// Mock data - would typically come from API
const jobDetails = {
  "JR-2025-001": {
    id: "JR-2025-001",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    department: "Engineering",
    location: "New York, NY (Remote)",
    positions: 2,
    startDate: "May 1, 2025",
    duration: "12 months",
    rate: "$85-95/hr",
    status: "Active",
    deadline: "Apr 15, 2025",
    expectedStartDate: "May 1, 2025",
    description:
      "We are seeking a Senior React Developer to join our dynamic team. The ideal candidate will have a strong background in developing complex web applications using React and related technologies.",
    responsibilities: [
      "Design and implement new features and functionality using React.js",
      "Build reusable components and front-end libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across a vast array of web-capable devices and browsers",
      "Collaborate with the team to define, design, and ship new features",
      "Identify and correct bottlenecks and fix bugs",
      "Help maintain code quality, organization, and automatization",
    ],
    requirements: [
      "5+ years of experience in front-end development",
      "3+ years of experience with React.js and Redux",
      "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
      "Thorough understanding of React.js and its core principles",
      "Experience with popular React.js workflows (such as Flux or Redux)",
      "Familiarity with newer specifications of ECMAScript",
      "Experience with data structure libraries (e.g., Immutable.js)",
      "Knowledge of isomorphic React is a plus",
      "Experience with common front-end development tools such as Babel, Webpack, NPM, etc.",
      "Familiarity with RESTful APIs and modern authorization mechanisms",
      "Good understanding of browser rendering behavior and performance",
    ],
    skills: ["React", "Redux", "TypeScript", "Node.js", "AWS", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
    hiringManager: "Jennifer Smith",
    mspOwner: "Robert Johnson",
    interviewProcess: "2 rounds - Technical and Team fit",
    workHours: "40 hours/week, flexible hours",
    note: "Possibility of extension or conversion to full-time",
    submittedProfiles: [
      {
        id: "C1",
        name: "Candidate 1",
        submittedDate: "Apr 1, 2025",
        experience: "5 years",
        rate: "$85/hr",
        location: "Remote",
        noticePeriod: "1 week",
        status: "Submitted",
      },
      {
        id: "C2",
        name: "Candidate 2",
        submittedDate: "Apr 2, 2025",
        experience: "6 years",
        rate: "$86/hr",
        location: "Hybrid",
        noticePeriod: "2 weeks",
        status: "Shortlisted",
      },
      {
        id: "C3",
        name: "Candidate 3",
        submittedDate: "Apr 3, 2025",
        experience: "7 years",
        rate: "$87/hr",
        location: "Hybrid",
        noticePeriod: "3 weeks",
        status: "Interview",
      },
      {
        id: "C4",
        name: "Candidate 4",
        submittedDate: "Apr 4, 2025",
        experience: "8 years",
        rate: "$88/hr",
        location: "Hybrid",
        noticePeriod: "4 weeks",
        status: "Rejected",
      },
    ],
  },
  "JR-2025-002": {
    id: "JR-2025-002",
    title: "DevOps Engineer",
    company: "CloudSys Solutions",
    department: "Infrastructure",
    location: "Chicago, IL (Hybrid)",
    positions: 1,
    startDate: "May 15, 2025",
    duration: "18 months",
    rate: "$90-100/hr",
    status: "Active",
    deadline: "Apr 10, 2025",
    expectedStartDate: "May 15, 2025",
    description:
      "We are looking for a skilled DevOps Engineer to help build and maintain our cloud infrastructure. The ideal candidate will have experience with AWS, containerization, and CI/CD pipelines.",
    responsibilities: [
      "Design, implement, and maintain CI/CD pipelines",
      "Manage and optimize AWS cloud infrastructure",
      "Implement containerization using Docker and Kubernetes",
      "Monitor system performance and troubleshoot issues",
      "Automate deployment processes and infrastructure provisioning",
      "Collaborate with development teams to improve deployment workflows",
      "Ensure security best practices across all environments",
      "Maintain documentation for infrastructure and processes",
    ],
    requirements: [
      "3+ years of experience in DevOps or Site Reliability Engineering",
      "Strong experience with AWS services (EC2, S3, RDS, Lambda, etc.)",
      "Proficiency with Docker and Kubernetes",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
      "Scripting skills in Python, Bash, or similar languages",
      "Experience with monitoring tools (CloudWatch, Prometheus, Grafana)",
      "Understanding of networking concepts and security practices",
      "Experience with version control systems (Git)",
      "Strong problem-solving and troubleshooting skills",
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Python", "Bash", "Prometheus", "Grafana", "Git"],
    hiringManager: "Michael Chen",
    mspOwner: "Sarah Williams",
    interviewProcess: "3 rounds - Technical, System Design, and Cultural fit",
    workHours: "40 hours/week, some on-call responsibilities",
    note: "Hybrid work model with 3 days in office",
    submittedProfiles: [
      {
        id: "D1",
        name: "DevOps Candidate 1",
        submittedDate: "Mar 28, 2025",
        experience: "4 years",
        rate: "$92/hr",
        location: "Hybrid",
        noticePeriod: "2 weeks",
        status: "Submitted",
      },
      {
        id: "D2",
        name: "DevOps Candidate 2",
        submittedDate: "Mar 30, 2025",
        experience: "5 years",
        rate: "$95/hr",
        location: "Hybrid",
        noticePeriod: "1 month",
        status: "Shortlisted",
      },
    ],
  },
  "JR-2025-003": {
    id: "JR-2025-003",
    title: "Data Scientist",
    company: "DataViz Analytics",
    department: "Data Science",
    location: "San Francisco, CA (Remote)",
    positions: 3,
    startDate: "June 1, 2025",
    duration: "24 months",
    rate: "$95-110/hr",
    status: "Active",
    deadline: "Apr 20, 2025",
    expectedStartDate: "June 1, 2025",
    description:
      "We are seeking experienced Data Scientists to join our analytics team. The ideal candidates will have expertise in machine learning, statistical analysis, and big data technologies.",
    responsibilities: [
      "Develop and implement machine learning models and algorithms",
      "Analyze large datasets to extract meaningful insights",
      "Create predictive models for business forecasting",
      "Design and conduct A/B tests and statistical experiments",
      "Collaborate with stakeholders to understand business requirements",
      "Present findings and recommendations to executive leadership",
      "Optimize existing models for better performance and accuracy",
      "Stay current with latest developments in data science and ML",
    ],
    requirements: [
      "Master's or PhD in Data Science, Statistics, Mathematics, or related field",
      "5+ years of experience in data science or machine learning",
      "Strong proficiency in Python and R programming languages",
      "Experience with machine learning frameworks (TensorFlow, PyTorch, Scikit-learn)",
      "Knowledge of SQL and database management",
      "Experience with big data technologies (Spark, Hadoop)",
      "Strong statistical analysis and modeling skills",
      "Experience with data visualization tools (Tableau, Power BI, matplotlib)",
      "Knowledge of cloud platforms (AWS, GCP, Azure)",
      "Excellent communication and presentation skills",
    ],
    skills: [
      "Python",
      "R",
      "Machine Learning",
      "SQL",
      "TensorFlow",
      "PyTorch",
      "Spark",
      "Tableau",
      "AWS",
      "Statistics",
    ],
    hiringManager: "Dr. Emily Rodriguez",
    mspOwner: "David Kim",
    interviewProcess: "4 rounds - Technical screening, Case study, Presentation, and Final interview",
    workHours: "40 hours/week, flexible schedule",
    note: "Remote-first position with quarterly team meetings",
    submittedProfiles: [
      {
        id: "DS1",
        name: "Data Scientist 1",
        submittedDate: "Apr 1, 2025",
        experience: "6 years",
        rate: "$98/hr",
        location: "Remote",
        noticePeriod: "3 weeks",
        status: "Submitted",
      },
      {
        id: "DS2",
        name: "Data Scientist 2",
        submittedDate: "Apr 3, 2025",
        experience: "7 years",
        rate: "$105/hr",
        location: "Remote",
        noticePeriod: "1 month",
        status: "Interview",
      },
      {
        id: "DS3",
        name: "Data Scientist 3",
        submittedDate: "Apr 5, 2025",
        experience: "5 years",
        rate: "$95/hr",
        location: "Remote",
        noticePeriod: "2 weeks",
        status: "Shortlisted",
      },
    ],
  },
  "JR-2025-004": {
    id: "JR-2025-004",
    title: "UX/UI Designer",
    company: "DesignCorp",
    department: "Product Design",
    location: "Austin, TX (Onsite)",
    positions: 1,
    startDate: "May 20, 2025",
    duration: "12 months",
    rate: "$75-85/hr",
    status: "Active",
    deadline: "Apr 12, 2025",
    expectedStartDate: "May 20, 2025",
    description:
      "We are looking for a talented UX/UI Designer to create exceptional user experiences for our digital products. The ideal candidate will have a strong portfolio and experience in user-centered design.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Collaborate with product managers and developers",
      "Develop and maintain design systems and style guides",
      "Present design concepts to stakeholders",
      "Iterate on designs based on user feedback and testing",
      "Stay updated with latest design trends and best practices",
    ],
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Strong portfolio demonstrating design process and outcomes",
      "Experience with user research methodologies",
      "Knowledge of responsive design principles",
      "Understanding of accessibility standards (WCAG)",
      "Experience with prototyping tools",
      "Strong communication and presentation skills",
      "Ability to work in a fast-paced, collaborative environment",
    ],
    skills: [
      "Figma",
      "Sketch",
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Wireframing",
      "Design Systems",
      "Accessibility",
      "Responsive Design",
      "Usability Testing",
    ],
    hiringManager: "Lisa Thompson",
    mspOwner: "Mark Davis",
    interviewProcess: "3 rounds - Portfolio review, Design challenge, and Team interview",
    workHours: "40 hours/week, standard business hours",
    note: "On-site position with modern design studio environment",
    submittedProfiles: [
      {
        id: "UX1",
        name: "UX Designer 1",
        submittedDate: "Mar 25, 2025",
        experience: "4 years",
        rate: "$78/hr",
        location: "Onsite",
        noticePeriod: "2 weeks",
        status: "Submitted",
      },
      {
        id: "UX2",
        name: "UX Designer 2",
        submittedDate: "Mar 28, 2025",
        experience: "5 years",
        rate: "$82/hr",
        location: "Onsite",
        noticePeriod: "3 weeks",
        status: "Interview",
      },
      {
        id: "UX3",
        name: "UX Designer 3",
        submittedDate: "Apr 1, 2025",
        experience: "3 years",
        rate: "$75/hr",
        location: "Onsite",
        noticePeriod: "1 month",
        status: "Rejected",
      },
    ],
  },
  "JR-2025-005": {
    id: "JR-2025-005",
    title: "Full Stack Developer",
    company: "TechStart Inc.",
    department: "Engineering",
    location: "Boston, MA (Hybrid)",
    positions: 2,
    startDate: "June 15, 2025",
    duration: "18 months",
    rate: "$80-90/hr",
    status: "Active",
    deadline: "Apr 25, 2025",
    expectedStartDate: "June 15, 2025",
    description:
      "We are seeking skilled Full Stack Developers to work on our cutting-edge web applications. The ideal candidates will have experience with both frontend and backend technologies.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Design and implement RESTful APIs and microservices",
      "Work with databases (MongoDB, PostgreSQL) for data management",
      "Collaborate with cross-functional teams on feature development",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and technical discussions",
      "Troubleshoot and debug applications",
      "Optimize applications for maximum speed and scalability",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "4+ years of experience in full-stack development",
      "Strong proficiency in JavaScript/TypeScript",
      "Experience with React.js and modern frontend frameworks",
      "Proficiency in Node.js and Express.js",
      "Experience with databases (MongoDB, PostgreSQL, MySQL)",
      "Knowledge of RESTful API design and development",
      "Familiarity with version control systems (Git)",
      "Understanding of Agile development methodologies",
      "Strong problem-solving and analytical skills",
    ],
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "JavaScript",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
      "Git",
      "Agile",
    ],
    hiringManager: "Alex Johnson",
    mspOwner: "Rachel Green",
    interviewProcess: "3 rounds - Technical screening, Coding challenge, and System design",
    workHours: "40 hours/week, flexible hours with core overlap",
    note: "Hybrid model with 2-3 days in office per week",
    submittedProfiles: [
      {
        id: "FS1",
        name: "Full Stack Dev 1",
        submittedDate: "Apr 2, 2025",
        experience: "5 years",
        rate: "$85/hr",
        location: "Hybrid",
        noticePeriod: "2 weeks",
        status: "Submitted",
      },
      {
        id: "FS2",
        name: "Full Stack Dev 2",
        submittedDate: "Apr 4, 2025",
        experience: "6 years",
        rate: "$88/hr",
        location: "Hybrid",
        noticePeriod: "1 month",
        status: "Shortlisted",
      },
    ],
  },
}

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id as string
  const [activeTab, setActiveTab] = useState("details")

  const job = jobDetails[jobId as keyof typeof jobDetails]

  if (!job) {
    return <div>Job not found</div>
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-purple-100 text-purple-800"
      case "interview":
        return "bg-black text-white"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/job-requirements" label="Back to Job Requirements" />
        <div className="text-sm text-gray-500">Vendor Account</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="flex border-b mb-6 bg-gray-50 rounded-t-lg">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-3 text-sm font-medium rounded-tl-lg ${
                activeTab === "details"
                  ? "bg-white border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("submit")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "submit"
                  ? "bg-white border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Submit Profile
            </button>
            <button
              onClick={() => setActiveTab("submitted")}
              className={`px-6 py-3 text-sm font-medium rounded-tr-lg ${
                activeTab === "submitted"
                  ? "bg-white border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Submitted Profiles
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white">
            {activeTab === "details" && (
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Job Description</h1>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Job Description:</h2>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-3">Responsibilities:</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-3">Requirements:</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "submit" && (
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Submit Candidate Profile</h1>
                <p className="text-gray-600 mb-6">Submit a candidate profile for job requirement {job.id}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience</label>
                    <input
                      type="number"
                      placeholder="Enter years of experience"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bill Rate ($/hr)</label>
                    <input
                      type="number"
                      placeholder="Enter bill rate"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Location</label>
                    <input
                      type="text"
                      placeholder="Enter current location"
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>Immediate</option>
                      <option>1 week</option>
                      <option>2 weeks</option>
                      <option>1 month</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Key Skills</label>
                  <textarea
                    placeholder="Enter key skills (comma separated)"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Professional Summary</label>
                  <textarea
                    placeholder="Enter professional summary"
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Submit Profile</Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </div>
            )}

            {activeTab === "submitted" && (
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Submitted Profiles</h1>
                <p className="text-gray-600 mb-6">
                  You have submitted {job.submittedProfiles.length} profiles for this job requirement
                </p>

                <div className="space-y-6">
                  {job.submittedProfiles.map((profile) => (
                    <div key={profile.id} className="border-b pb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center font-semibold">
                            {profile.id}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{profile.name}</h3>
                            <p className="text-sm text-gray-500">Submitted on {profile.submittedDate}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(profile.status)}>{profile.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Experience:</span>
                          <div className="font-medium">{profile.experience}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Rate:</span>
                          <div className="font-medium">{profile.rate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <div className="font-medium">{profile.location}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Notice Period:</span>
                          <div className="font-medium">{profile.noticePeriod}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-1">Company</h3>
                  <p className="font-medium">{job.company}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-1">Department</h3>
                  <p className="font-medium">{job.department}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{job.positions} positions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Start Date: {job.startDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Duration: {job.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSignIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Rate: {job.rate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Key Contacts</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Hiring Manager:</p>
                  <p className="font-medium">{job.hiringManager}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">MSP Owner:</p>
                  <p className="font-medium">{job.mspOwner}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Additional Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Interview Process:</span>
                  <p>{job.interviewProcess}</p>
                </div>
                <div>
                  <span className="text-gray-500">Work Hours:</span>
                  <p>{job.workHours}</p>
                </div>
                <div>
                  <span className="text-gray-500">Note:</span>
                  <p>{job.note}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Important Dates</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Submission Deadline</span>
                  <span className="text-sm font-medium">{job.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Expected Start Date</span>
                  <span className="text-sm font-medium">{job.expectedStartDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
