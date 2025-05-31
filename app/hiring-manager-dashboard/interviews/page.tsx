"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InterviewSchedule } from "@/components/interview-schedule"
import { InterviewFeedback } from "@/components/interview-feedback"
import { PageHeader } from "@/components/page-header"

export default function InterviewsPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Interview Management"
        description="Schedule interviews and provide feedback"
      />

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="feedback">Interview Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <InterviewSchedule />
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4">
          <InterviewFeedback />
        </TabsContent>
      </Tabs>
    </div>
  )
} 