"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExitProcessList } from "@/components/exit-process-list"

export default function ExitProcessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exit Process Management</h1>
        <p className="text-gray-600">Initiate and manage worker deboarding process</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

              <Button type="submit" className="w-full">Initiate Exit Process</Button>
            </form>
          </CardContent>
        </Card>

        <ExitProcessList />
      </div>
    </div>
  )
} 