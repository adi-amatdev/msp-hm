"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobRequestList } from "@/components/job-request-list"
import { PageHeader } from "@/components/page-header"

export default function JobRequestsPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Job Request Management"
        description="Submit and track staffing requirements"
      />

      <div className="grid gap-6 md:grid-cols-2">
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

              <Button type="submit" className="w-full">Submit Job Request</Button>
            </form>
          </CardContent>
        </Card>

        <JobRequestList />
      </div>
    </div>
  )
} 