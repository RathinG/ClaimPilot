import { EvidenceAgentCard } from "../evidence-agent-card";

export default function EvidenceAgentCardExample() {
  const mockSummary = {
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

  return (
    <div className="p-4 max-w-4xl">
      <EvidenceAgentCard summary={mockSummary} />
    </div>
  );
}
