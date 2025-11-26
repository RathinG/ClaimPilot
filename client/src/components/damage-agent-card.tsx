import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DamageAssessment } from "@shared/schema";

interface DamageAgentCardProps {
  assessment?: DamageAssessment;
  photos?: string[];
}

export function DamageAgentCard({ assessment, photos }: DamageAgentCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!assessment) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-xl">Damage Understanding Agent</CardTitle>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const severityConfig = {
    minor: { color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20" },
    moderate: { color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
    severe: { color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/20" },
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-xl">Damage Understanding Agent</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Severity: {assessment.severityScore}/100</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-toggle-damage">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Severity Score</span>
                <span className="font-mono font-semibold">{assessment.severityScore}/100</span>
              </div>
              <Progress value={assessment.severityScore} className="h-2" />
            </div>

            {photos && photos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Uploaded Photos</h4>
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="aspect-square rounded-md overflow-hidden border border-border bg-muted flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Damaged Parts</h4>
              <div className="space-y-2">
                {assessment.damagedParts.map((part, idx) => (
                  <div key={idx} className={`rounded-md border p-3 ${severityConfig[part.severity].bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{part.part}</span>
                      <Badge variant="outline" className={severityConfig[part.severity].color}>
                        {part.severity.charAt(0).toUpperCase() + part.severity.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Impact Angle</span>
                <p className="text-sm font-semibold">{assessment.impactAngle}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Image Consistency</span>
                <p className="text-sm font-semibold">
                  {assessment.imageConsistency ? (
                    <span className="text-green-600">Consistent</span>
                  ) : (
                    <span className="text-red-600">Inconsistent</span>
                  )}
                </p>
              </div>
            </div>

            {assessment.photoFlags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Photo Analysis Flags
                </h4>
                <div className="space-y-2">
                  {assessment.photoFlags.map((flag, idx) => (
                    <div key={idx} className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-2">
                      <p className="text-sm text-amber-900 dark:text-amber-200">{flag}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
