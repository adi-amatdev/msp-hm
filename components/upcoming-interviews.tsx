import { CalendarIcon, ClockIcon, MapPinIcon, VideoIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API
const interviews = [
  {
    id: 1,
    candidate: {
      name: "Michael Johnson",
      initials: "MJ",
      position: "Senior React Developer",
    },
    date: "Apr 5, 2025",
    time: "10:00 AM EST",
    location: "TechCorp Inc.",
    type: "Video",
  },
  {
    id: 2,
    candidate: {
      name: "Sarah Williams",
      initials: "SW",
      position: "DevOps Engineer",
    },
    date: "Apr 7, 2025",
    time: "2:30 PM EST",
    location: "CloudSys Solutions",
    type: "Video",
  },
  {
    id: 3,
    candidate: {
      name: "David Chen",
      initials: "DC",
      position: "Data Scientist",
    },
    date: "Apr 8, 2025",
    time: "11:15 AM PST",
    location: "DataViz Analytics",
    type: "In-person",
  },
]

export function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Interviews</CardTitle>
        <p className="text-sm text-muted-foreground">Scheduled interviews for your candidates</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <Card key={interview.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 border-b p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted font-semibold">
                    {interview.candidate.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{interview.candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{interview.candidate.position}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={interview.type === "Video" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}
                  >
                    {interview.type === "Video" ? <VideoIcon className="mr-1 h-3 w-3" /> : null}
                    {interview.type}
                  </Badge>
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{interview.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{interview.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{interview.location}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-t">
                  <Button variant="ghost" className="rounded-none py-5">
                    View Details
                  </Button>
                  <Button variant="ghost" className="rounded-none border-l py-5">
                    Prepare Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
