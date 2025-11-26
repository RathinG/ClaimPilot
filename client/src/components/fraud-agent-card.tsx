import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FraudAnalysis } from "@shared/schema";

interface FraudAgentCardProps {
  analysis?: FraudAnalysis;
}

export function FraudAgentCard({ analysis }: FraudAgentCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-4" />
              <CardTitle className="text-xl">Fraud Signal Agent</CardTitle>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const getRiskLevel = (score: number) => {
    if (score < 30) return { label: "Low", variant: "default" as const, color: "text-green-600" };
    if (score < 70) return { label: "Medium", variant: "secondary" as const, color: "text-amber-600" };
    return { label: "High", variant: "destructive" as const, color: "text-red-600" };
  };

  const riskLevel = getRiskLevel(analysis.riskScore);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-4" />
              <CardTitle className="text-xl">Fraud Signal Agent</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={riskLevel.variant}>{riskLevel.label} Risk</Badge>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-toggle-fraud">
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
                <span className="text-muted-foreground">Fraud Risk Score</span>
                <span className={`font-mono font-semibold ${riskLevel.color}`}>{analysis.riskScore}/100</span>
              </div>
              <Progress value={analysis.riskScore} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border border-border p-3 space-y-1">
                <span className="text-xs text-muted-foreground">Photo Reuse</span>
                <p className="text-sm font-semibold">
                  {analysis.photoReuseDetected ? (
                    <span className="text-red-600">Detected</span>
                  ) : (
                    <span className="text-green-600">Not Detected</span>
                  )}
                </p>
              </div>
              <div className="rounded-md border border-border p-3 space-y-1">
                <span className="text-xs text-muted-foreground">Story Consistency</span>
                <p className="text-sm font-semibold">
                  {analysis.storyMismatch ? (
                    <span className="text-red-600">Mismatch Found</span>
                  ) : (
                    <span className="text-green-600">Consistent</span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Fraud Signals Detected</h4>
              <div className="space-y-2">
                {analysis.signals.map((signal, idx) => (
                  <div key={idx} className="rounded-md border border-border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{signal.type}</span>
                      <Badge variant="outline">{signal.confidence}% confidence</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{signal.description}</p>
                    <Progress value={signal.confidence} className="h-1" />
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
