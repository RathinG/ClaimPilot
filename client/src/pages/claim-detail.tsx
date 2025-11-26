import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";
import { CoverageAgentCard } from "@/components/coverage-agent-card";
import { EvidenceAgentCard } from "@/components/evidence-agent-card";
import { DamageAgentCard } from "@/components/damage-agent-card";
import { FraudAgentCard } from "@/components/fraud-agent-card";
import { TriageAgentCard } from "@/components/triage-agent-card";

//todo: remove mock functionality
const mockClaim = {
  id: "CLM-2024-001",
  policyNumber: "POL-12345",
  vin: "1HGCM82633A123456",
  claimantName: "John Smith",
  incidentDate: new Date("2024-01-15T14:30:00"),
  incidentDescription: "Rear-end collision at Main St & Oak Ave intersection. I was stopped at a red light when another vehicle failed to stop and struck my vehicle from behind.",
  status: "in_review",
  photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"],
};

const mockCoverageAnalysis = {
  decision: "partial" as const,
  coveragePercentage: 75,
  applicableClauses: [
    {
      clauseId: "§3.2.1",
      text: "Coverage applies to sudden and accidental collision damage to the insured vehicle.",
      applies: true,
    },
    {
      clauseId: "§3.2.4",
      text: "Deductible of $500 applies to all collision claims.",
      applies: true,
    },
    {
      clauseId: "§4.1.2",
      text: "Excludes damage from intentional acts or racing activities.",
      applies: false,
    },
  ],
  policyTerms: ["Collision Coverage", "Comprehensive", "Deductible"],
};

const mockEvidenceSummary = {
  timeline: [
    { time: "2024-01-15 14:30", event: "Vehicle collision occurred at intersection" },
    { time: "2024-01-15 14:35", event: "Police arrived at scene" },
    { time: "2024-01-15 15:00", event: "Witness statement recorded" },
    { time: "2024-01-15 16:20", event: "Vehicle towed to repair facility" },
  ],
  entities: [
    { type: "person" as const, value: "John Smith (Claimant)" },
    { type: "person" as const, value: "Officer Martinez (Police)" },
    { type: "location" as const, value: "Main St & Oak Ave" },
    { type: "vehicle" as const, value: "2020 Honda Accord" },
  ],
  contradictions: [
    "Claimant states they were traveling at 25mph, but witness reports observed speed of approximately 40mph",
  ],
  confidence: 87,
};

const mockDamageAssessment = {
  damagedParts: [
    { part: "Rear Bumper", severity: "severe" as const },
    { part: "Trunk Lid", severity: "moderate" as const },
    { part: "Rear Left Taillight", severity: "severe" as const },
    { part: "Rear Right Taillight", severity: "moderate" as const },
    { part: "Exhaust System", severity: "minor" as const },
  ],
  impactAngle: "Rear-center at 0°",
  severityScore: 72,
  imageConsistency: true,
  photoFlags: ["Photo timestamp inconsistency detected in image 3"],
};

const mockFraudAnalysis = {
  riskScore: 65,
  signals: [
    {
      type: "Anomaly Detection",
      confidence: 72,
      description: "Claim pattern matches historical fraud cases with 72% similarity",
    },
    {
      type: "Photo Analysis",
      confidence: 58,
      description: "Image metadata suggests possible photo manipulation",
    },
    {
      type: "Timeline Inconsistency",
      confidence: 81,
      description: "Gap between incident time and first notification exceeds normal threshold",
    },
  ],
  photoReuseDetected: false,
  storyMismatch: true,
};

const mockTriageBrief = {
  recommendation: "adjuster" as const,
  summary: "This claim requires manual adjuster review due to moderate fraud signals and evidence contradictions. While coverage analysis indicates partial coverage, the discrepancies in witness statements and photo timestamp inconsistencies warrant human expertise before final approval.",
  actionItems: [
    "Contact claimant to clarify speed discrepancy",
    "Request additional photos of damage from different angles",
    "Verify police report details match claimant statement",
    "Schedule in-person vehicle inspection",
  ],
  combinedConfidence: 78,
  reasoning: "Coverage verification shows 75% coverage with applicable deductible. Evidence timeline reveals contradictions requiring clarification. Damage assessment is consistent with reported incident angle. Fraud score of 65/100 falls in medium-risk category, primarily due to timeline gaps and minor photo inconsistencies. Overall confidence warrants adjuster oversight rather than auto-approval or fraud investigation.",
};

export default function ClaimDetail() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/claims">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold">{mockClaim.id}</h1>
              <Badge variant="default">In Review</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {mockClaim.claimantName} • {mockClaim.incidentDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button variant="outline" data-testid="button-export">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Policy Number</span>
            <p className="text-sm font-mono font-semibold">{mockClaim.policyNumber}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">VIN</span>
            <p className="text-sm font-mono">{mockClaim.vin}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Incident Date</span>
            <p className="text-sm">{mockClaim.incidentDate.toLocaleString()}</p>
          </div>
          <div className="col-span-3 space-y-1">
            <span className="text-xs text-muted-foreground">Description</span>
            <p className="text-sm">{mockClaim.incidentDescription}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">AI Agent Analysis</h2>
        <CoverageAgentCard analysis={mockCoverageAnalysis} />
        <EvidenceAgentCard summary={mockEvidenceSummary} />
        <DamageAgentCard assessment={mockDamageAssessment} photos={mockClaim.photos} />
        <FraudAgentCard analysis={mockFraudAnalysis} />
        <TriageAgentCard brief={mockTriageBrief} />
      </div>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" data-testid="button-reject">
          Reject Claim
        </Button>
        <Button data-testid="button-approve">
          Approve Claim
        </Button>
      </div>
    </div>
  );
}
