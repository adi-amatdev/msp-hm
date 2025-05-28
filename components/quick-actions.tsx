import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, FileText, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      title: "Create Job Post",
      description: "Create new job posting from HM requirements",
      icon: <Plus className="h-5 w-5" />,
      href: "/msp-dashboard/create-job-posts",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Screen Profiles",
      description: "Review and validate candidate submissions",
      icon: <Search className="h-5 w-5" />,
      href: "/msp-dashboard/profile-screening",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Schedule Interviews",
      description: "Coordinate interviews with hiring managers",
      icon: <Calendar className="h-5 w-5" />,
      href: "/msp-dashboard/interview-requests",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Release Offers",
      description: "Process and release approved offers",
      icon: <FileText className="h-5 w-5" />,
      href: "/msp-dashboard/release-offers",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "Track Progress",
      description: "Monitor job and candidate progress",
      icon: <TrendingUp className="h-5 w-5" />,
      href: "/msp-dashboard/track-job-progress",
      color: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "View Reports",
      description: "Access analytics and performance reports",
      icon: <Users className="h-5 w-5" />,
      href: "/msp-dashboard/reports",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <div
                className={`w-full h-full p-4 rounded-md flex flex-col items-center justify-center gap-2 ${action.color} text-white text-center transition-colors hover:brightness-110`}
              >
                {action.icon}
                <div className="flex flex-col items-center w-full">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90 break-words text-wrap leading-tight">
                    {action.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
