import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

//todo: remove mock functionality
const stats = [
  {
    title: "Total Claims",
    value: "247",
    change: "+12% from last month",
    icon: FileText,
    color: "text-primary",
  },
  {
    title: "Pending Review",
    value: "18",
    change: "3 require urgent attention",
    icon: Clock,
    color: "text-amber-600",
  },
  {
    title: "Approved",
    value: "203",
    change: "82% approval rate",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Flagged",
    value: "26",
    change: "Fraud investigation",
    icon: AlertTriangle,
    color: "text-red-600",
  },
];

const recentClaims = [
  {
    id: "CLM-2024-247",
    claimant: "Michael Chen",
    status: "Flagged",
    date: "2 hours ago",
    statusVariant: "destructive" as const,
  },
  {
    id: "CLM-2024-246",
    claimant: "Sarah Johnson",
    status: "Approved",
    date: "4 hours ago",
    statusVariant: "default" as const,
  },
  {
    id: "CLM-2024-245",
    claimant: "John Smith",
    status: "In Review",
    date: "5 hours ago",
    statusVariant: "secondary" as const,
  },
  {
    id: "CLM-2024-244",
    claimant: "Emma Wilson",
    status: "Approved",
    date: "6 hours ago",
    statusVariant: "default" as const,
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered claims processing overview
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentClaims.map((claim) => (
              <Link key={claim.id} href={`/claim/${claim.id}`}>
                <div className="flex items-center justify-between p-3 rounded-md border border-border hover-elevate" data-testid={`card-recent-claim-${claim.id}`}>
                  <div className="space-y-1">
                    <p className="text-sm font-mono font-semibold">{claim.id}</p>
                    <p className="text-xs text-muted-foreground">{claim.claimant}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs text-muted-foreground">{claim.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Agent Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Coverage Verification</span>
                <span className="font-mono font-semibold">94%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "94%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Evidence Summarization</span>
                <span className="font-mono font-semibold">91%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-chart-2" style={{ width: "91%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Damage Understanding</span>
                <span className="font-mono font-semibold">88%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-chart-3" style={{ width: "88%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fraud Detection</span>
                <span className="font-mono font-semibold">96%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-chart-4" style={{ width: "96%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Triage Synthesis</span>
                <span className="font-mono font-semibold">93%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-chart-5" style={{ width: "93%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/new-claim">
            <Button data-testid="button-quick-new-claim">Submit New Claim</Button>
          </Link>
          <Link href="/claims">
            <Button variant="outline" data-testid="button-quick-view-claims">View All Claims</Button>
          </Link>
          <Button variant="outline" data-testid="button-quick-analytics">View Analytics</Button>
        </CardContent>
      </Card>
    </div>
  );
}
