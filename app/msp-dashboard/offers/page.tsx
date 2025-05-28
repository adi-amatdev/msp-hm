"use client"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertTriangle } from "lucide-react"

const pendingOffers = [
  {
    id: "POFF-001",
    candidateName: "Robert Kim",
    jobTitle: "DevOps Engineer",
    jobId: "JR-2025-001",
    hiringManager: "Jennifer Smith",
    hmApproval: "Approved",
    proposedRate: "$92/hr",
    startDate: "May 1, 2025",
  },
  {
    id: "POFF-002",
    candidateName: "David Wilson",
    jobTitle: "Full Stack Developer",
    jobId: "JR-2025-005",
    hiringManager: "Alex Johnson",
    hmApproval: "Pending",
    proposedRate: "$85/hr",
    startDate: "May 15, 2025",
  },
  {
    id: "POFF-003",
    candidateName: "Sarah Lee",
    jobTitle: "Data Analyst",
    jobId: "JR-2025-007",
    hiringManager: "Michael Chen",
    hmApproval: "Approved",
    proposedRate: "$75/hr",
    startDate: "June 1, 2025",
  },
]

export default function OffersPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Offer Management"
        description="Release and track job offers after hiring manager approval"
        action={{
          label: "Create Offer",
        }}
      />

      <div className="space-y-4">
        {pendingOffers.map((offer) => (
          <Card key={offer.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{offer.candidateName}</h3>
                <p className="text-gray-500">{offer.jobTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {offer.hmApproval === "Approved" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-500">Approved</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="text-yellow-500">Pending</span>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Rate</p>
                <p className="font-medium">{offer.proposedRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{offer.startDate}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {offer.hmApproval === "Approved" && (
                <>
                  <Button className="bg-green-500 hover:bg-green-700 text-white">Release Offer</Button>
                  <Button variant="outline" className="text-red-500 hover:bg-red-50">
                    Cancel Offer
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
