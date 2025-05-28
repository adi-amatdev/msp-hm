"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Clock, DollarSign, Calendar, User } from "lucide-react"

const pendingOffers = [
  {
    id: "POFF-001",
    candidateName: "Robert Kim",
    jobTitle: "DevOps Engineer",
    jobId: "JR-2025-001",
    hiringManager: "Jennifer Smith",
    vendor: "TechTalent Solutions",
    hmApproval: "Approved",
    hmRemarks: "Excellent technical skills, good cultural fit",
    proposedRate: "$92/hr",
    startDate: "May 1, 2025",
    duration: "12 months",
    documentsVerified: true,
    approvalDate: "Apr 18, 2025",
  },
  {
    id: "POFF-002",
    candidateName: "Maria Rodriguez",
    jobTitle: "Data Scientist",
    jobId: "JR-2025-003",
    hiringManager: "Dr. Emily Rodriguez",
    vendor: "Elite Contractors",
    hmApproval: "Approved",
    hmRemarks: "Strong analytical background, PhD in Statistics",
    proposedRate: "$108/hr",
    startDate: "May 15, 2025",
    duration: "18 months",
    documentsVerified: true,
    approvalDate: "Apr 16, 2025",
  },
  {
    id: "POFF-003",
    candidateName: "David Wilson",
    jobTitle: "Full Stack Developer",
    jobId: "JR-2025-005",
    hiringManager: "Alex Johnson",
    vendor: "CodeCrafters Inc.",
    hmApproval: "Pending",
    hmRemarks: "Waiting for final interview feedback",
    proposedRate: "$85/hr",
    startDate: "May 20, 2025",
    duration: "6 months",
    documentsVerified: false,
    approvalDate: null,
  },
  {
    id: "POFF-004",
    candidateName: "Sarah Lee",
    jobTitle: "UX Designer",
    jobId: "JR-2025-007",
    hiringManager: "Lisa Thompson",
    vendor: "Design Professionals",
    hmApproval: "Approved",
    hmRemarks: "Creative portfolio, great design thinking",
    proposedRate: "$75/hr",
    startDate: "June 1, 2025",
    duration: "9 months",
    documentsVerified: true,
    approvalDate: "Apr 19, 2025",
  },
]

export default function ReleaseOffersPage() {
  const getApprovalStatus = (approval: string) => {
    switch (approval) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canReleaseOffer = (offer: any) => {
    return offer.hmApproval === "Approved" && offer.documentsVerified
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Release Offers"
        description="Release job offers to candidates upon hiring manager approval and document verification"
      />

      <div className="space-y-4">
        {pendingOffers.map((offer) => (
          <Card key={offer.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{offer.candidateName}</h3>
                <p className="text-gray-600">{offer.jobTitle}</p>
                <p className="text-sm text-gray-500">
                  {offer.jobId} • {offer.vendor}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getApprovalStatus(offer.hmApproval)}>{offer.hmApproval}</Badge>
                {offer.documentsVerified ? (
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Documents Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-yellow-600 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Documents Pending</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Rate</p>
                  <p className="font-medium">{offer.proposedRate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{offer.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{offer.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Hiring Manager</p>
                  <p className="font-medium">{offer.hiringManager}</p>
                </div>
              </div>
            </div>

            {offer.hmRemarks && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-900 mb-1">Hiring Manager Remarks:</p>
                <p className="text-sm text-blue-800">"{offer.hmRemarks}"</p>
                {offer.approvalDate && <p className="text-xs text-blue-600 mt-1">Approved on: {offer.approvalDate}</p>}
              </div>
            )}

            <div className="flex justify-end gap-2">
              {canReleaseOffer(offer) ? (
                <>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Release Offer</Button>
                  <Button variant="outline" className="text-red-600 hover:bg-red-50">
                    Cancel Offer
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" disabled>
                    {offer.hmApproval === "Pending" ? "Awaiting HM Approval" : "Documents Required"}
                  </Button>
                  <Button variant="outline" className="text-red-600 hover:bg-red-50">
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
