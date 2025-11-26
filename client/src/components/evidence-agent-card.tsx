import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { EvidenceSummary } from "@shared/schema";

interface EvidenceAgentCardProps {
  summary?: EvidenceSummary;
}

export function EvidenceAgentCard({ summary }: EvidenceAgentCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-2" />
              <CardTitle className="text-xl">Evidence Summarization Agent</CardTitle>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-2" />
              <CardTitle className="text-xl">Evidence Summarization Agent</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Confidence: {summary.confidence}%</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-toggle-evidence">
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
                <span className="text-muted-foreground">Analysis Confidence</span>
                <span className="font-mono font-semibold">{summary.confidence}%</span>
              </div>
              <Progress value={summary.confidence} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Timeline</h4>
              <div className="relative border-l-2 border-primary/20 pl-4 space-y-4">
                {summary.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-muted-foreground">{event.time}</span>
                      <p className="text-sm">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Extracted Entities</h4>
              <div className="grid grid-cols-2 gap-2">
                {summary.entities.map((entity, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-md border border-border p-2">
                    <Badge variant="outline" className="text-xs">{entity.type}</Badge>
                    <span className="text-sm truncate">{entity.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {summary.contradictions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Contradictions Detected
                </h4>
                <div className="space-y-2">
                  {summary.contradictions.map((contradiction, idx) => (
                    <div key={idx} className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3">
                      <p className="text-sm text-amber-900 dark:text-amber-200">{contradiction}</p>
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
