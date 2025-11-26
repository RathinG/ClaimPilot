import { CoverageAgentCard } from "../coverage-agent-card";

export default function CoverageAgentCardExample() {
  const mockAnalysis = {
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

  return (
    <div className="p-4 max-w-4xl">
      <CoverageAgentCard analysis={mockAnalysis} />
    </div>
  );
}
