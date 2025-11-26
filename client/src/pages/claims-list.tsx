import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import { Link } from "wouter";
import type { Claim } from "@shared/schema";

//todo: remove mock functionality
const mockClaims: Claim[] = [
  {
    id: "CLM-2024-001",
    policyNumber: "POL-12345",
    vin: "1HGCM82633A123456",
    claimantName: "John Smith",
    incidentDate: new Date("2024-01-15T14:30:00"),
    incidentDescription: "Rear-end collision at intersection",
    status: "in_review",
    priority: "medium",
    createdAt: new Date("2024-01-15T16:00:00"),
    photos: ["photo1.jpg", "photo2.jpg"],
    coverageAnalysis: {
      decision: "partial",
      coveragePercentage: 75,
      applicableClauses: [],
      policyTerms: [],
    },
    evidenceSummary: null,
    damageAssessment: null,
    fraudAnalysis: null,
    triageBrief: {
      recommendation: "adjuster",
      summary: "Requires manual review",
      actionItems: [],
      combinedConfidence: 78,
      reasoning: "",
    },
  },
  {
    id: "CLM-2024-002",
    policyNumber: "POL-67890",
    vin: "2T1BURHE5FC123789",
    claimantName: "Sarah Johnson",
    incidentDate: new Date("2024-01-20T09:15:00"),
    incidentDescription: "Single-vehicle accident on highway",
    status: "approved",
    priority: "low",
    createdAt: new Date("2024-01-20T10:30:00"),
    photos: ["photo1.jpg"],
    coverageAnalysis: {
      decision: "covered",
      applicableClauses: [],
      policyTerms: [],
    },
    evidenceSummary: null,
    damageAssessment: null,
    fraudAnalysis: null,
    triageBrief: {
      recommendation: "fast_track",
      summary: "Auto-approved",
      actionItems: [],
      combinedConfidence: 92,
      reasoning: "",
    },
  },
  {
    id: "CLM-2024-003",
    policyNumber: "POL-11122",
    vin: "5YJSA1E26HF123456",
    claimantName: "Michael Chen",
    incidentDate: new Date("2024-01-22T18:45:00"),
    incidentDescription: "Parking lot collision",
    status: "flagged",
    priority: "high",
    createdAt: new Date("2024-01-22T19:00:00"),
    photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
    coverageAnalysis: {
      decision: "not_covered",
      applicableClauses: [],
      policyTerms: [],
    },
    evidenceSummary: null,
    damageAssessment: null,
    fraudAnalysis: {
      riskScore: 85,
      signals: [],
      photoReuseDetected: true,
      storyMismatch: true,
    },
    triageBrief: {
      recommendation: "siu",
      summary: "Fraud investigation required",
      actionItems: [],
      combinedConfidence: 88,
      reasoning: "",
    },
  },
];

const statusConfig = {
  new: { label: "New", variant: "secondary" as const },
  in_review: { label: "In Review", variant: "default" as const },
  approved: { label: "Approved", variant: "default" as const },
  flagged: { label: "Flagged", variant: "destructive" as const },
  rejected: { label: "Rejected", variant: "destructive" as const },
};

const priorityConfig = {
  low: { label: "Low", variant: "secondary" as const },
  medium: { label: "secondary" as const, variant: "secondary" as const },
  high: { label: "High", variant: "destructive" as const },
};

export default function ClaimsList() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Claims</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage all insurance claims
          </p>
        </div>
        <Link href="/new-claim">
          <Button data-testid="button-new-claim">
            <Plus className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-semibold">Claim ID</th>
                <th className="p-4 text-sm font-semibold">Policy Number</th>
                <th className="p-4 text-sm font-semibold">Claimant</th>
                <th className="p-4 text-sm font-semibold">Date</th>
                <th className="p-4 text-sm font-semibold">Status</th>
                <th className="p-4 text-sm font-semibold">Priority</th>
                <th className="p-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="border-b border-border hover-elevate"
                  data-testid={`row-claim-${claim.id}`}
                >
                  <td className="p-4">
                    <span className="text-sm font-mono font-semibold">{claim.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono">{claim.policyNumber}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{claim.claimantName}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {claim.incidentDate.toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={statusConfig[claim.status as keyof typeof statusConfig].variant}>
                      {statusConfig[claim.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {claim.priority && (
                      <Badge variant={priorityConfig[claim.priority as keyof typeof priorityConfig].variant}>
                        {priorityConfig[claim.priority as keyof typeof priorityConfig].label}
                      </Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <Link href={`/claim/${claim.id}`}>
                      <Button variant="ghost" size="icon" data-testid={`button-view-${claim.id}`}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
