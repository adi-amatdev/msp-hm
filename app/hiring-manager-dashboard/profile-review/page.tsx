"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileReviewList } from "@/components/profile-review-list"
import { ProfileHistory } from "@/components/profile-history"
import { PageHeader } from "@/components/page-header"

export default function ProfileReviewPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Profile Review"
        description="Review and evaluate candidate profiles"
      />

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <ProfileReviewList />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <ProfileHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
} 