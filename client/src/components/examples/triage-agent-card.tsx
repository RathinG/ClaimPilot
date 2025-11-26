import { TriageAgentCard } from "../triage-agent-card";

export default function TriageAgentCardExample() {
  const mockBrief = {
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

  return (
    <div className="p-4 max-w-4xl">
      <TriageAgentCard brief={mockBrief} />
    </div>
  );
}
