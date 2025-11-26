import { DamageAgentCard } from "../damage-agent-card";

export default function DamageAgentCardExample() {
  const mockAssessment = {
    damagedParts: [
      { part: "Front Bumper", severity: "severe" as const },
      { part: "Hood", severity: "moderate" as const },
      { part: "Right Headlight", severity: "severe" as const },
      { part: "Right Fender", severity: "moderate" as const },
      { part: "Radiator", severity: "minor" as const },
    ],
    impactAngle: "Front-right at 45°",
    severityScore: 72,
    imageConsistency: true,
    photoFlags: ["Photo timestamp inconsistency detected in image 3"],
  };

  const mockPhotos = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"];

  return (
    <div className="p-4 max-w-4xl">
      <DamageAgentCard assessment={mockAssessment} photos={mockPhotos} />
    </div>
  );
}
