import { FraudAgentCard } from "../fraud-agent-card";

export default function FraudAgentCardExample() {
  const mockAnalysis = {
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

  return (
    <div className="p-4 max-w-4xl">
      <FraudAgentCard analysis={mockAnalysis} />
    </div>
  );
}
