import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// This would typically come from an API
const jobRequirements = [
  {
    id: "JR-2025-001",
    title: "Senior React Developer",
    location: "New York, NY (Remote)",
    positions: 2,
    rate: "$85-95/hr",
    status: "Active",
    deadline: "Apr 15, 2025",
  },
  {
    id: "JR-2025-002",
    title: "DevOps Engineer",
    location: "Chicago, IL (Hybrid)",
    positions: 1,
    rate: "$90-100/hr",
    status: "Active",
    deadline: "Apr 10, 2025",
  },
  {
    id: "JR-2025-003",
    title: "Data Scientist",
    location: "San Francisco, CA (Remote)",
    positions: 3,
    rate: "$95-110/hr",
    status: "Active",
    deadline: "Apr 20, 2025",
  },
  {
    id: "JR-2025-004",
    title: "UX/UI Designer",
    location: "Austin, TX (Onsite)",
    positions: 1,
    rate: "$75-85/hr",
    status: "Active",
    deadline: "Apr 12, 2025",
  },
]

export function JobRequirementsTable() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Recent Job Requirements</CardTitle>
        <p className="text-sm text-muted-foreground">View and manage active job requirements</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Job ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Positions</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobRequirements.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.id}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell className="text-center">{job.positions}</TableCell>
                <TableCell>{job.rate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.deadline}</TableCell>
                <TableCell>
                  <Link href={`/job-requirements/${job.id}`}>
                    <ArrowRight className="h-4 w-4 text-gray-600 hover:text-gray-900 cursor-pointer" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Link href="/job-requirements" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View All Job Requirements
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
