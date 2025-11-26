import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TriageBrief } from "@shared/schema";

interface TriageAgentCardProps {
  brief?: TriageBrief;
}

export function TriageAgentCard({ brief }: TriageAgentCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!brief) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-chart-5" />
              <CardTitle className="text-xl">Triage Brief Synthesis Agent</CardTitle>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const recommendationConfig = {
    fast_track: { label: "Fast-Track", variant: "default" as const, color: "text-green-600" },
    adjuster: { label: "Adjuster Review", variant: "secondary" as const, color: "text-amber-600" },
    siu: { label: "SIU Investigation", variant: "destructive" as const, color: "text-red-600" },
  };

  const config = recommendationConfig[brief.recommendation];

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-chart-5" />
              <CardTitle className="text-xl">Triage Brief Synthesis Agent</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={config.variant}>{config.label}</Badge>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-toggle-triage">
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
                <span className="text-muted-foreground">Combined Confidence</span>
                <span className="font-mono font-semibold">{brief.combinedConfidence}%</span>
              </div>
              <Progress value={brief.combinedConfidence} className="h-2" />
            </div>

            <div className="rounded-md bg-muted/50 p-4 space-y-2">
              <h4 className="text-sm font-semibold">Executive Summary</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{brief.summary}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Routing Recommendation</h4>
              <div className={`rounded-md border p-3 ${config.color}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold">{config.label}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">AI Reasoning</h4>
              <div className="rounded-md border border-border p-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{brief.reasoning}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Action Items</h4>
              <div className="space-y-2">
                {brief.actionItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 rounded-md bg-muted/30 p-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
