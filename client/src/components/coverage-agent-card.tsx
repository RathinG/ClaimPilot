import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { CoverageAnalysis } from "@shared/schema";

interface CoverageAgentCardProps {
  analysis?: CoverageAnalysis;
}

export function CoverageAgentCard({ analysis }: CoverageAgentCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Coverage Verification Agent</CardTitle>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const decisionConfig = {
    covered: { label: "Covered", variant: "default" as const, icon: CheckCircle2, color: "text-green-600" },
    not_covered: { label: "Not Covered", variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    partial: { label: "Partial Coverage", variant: "secondary" as const, icon: AlertCircle, color: "text-amber-600" },
  };

  const config = decisionConfig[analysis.decision];
  const Icon = config.icon;

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Coverage Verification Agent</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={config.variant}>{config.label}</Badge>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-toggle-coverage">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${config.color}`} />
              <span className="text-sm font-medium">Decision: {config.label}</span>
            </div>

            {analysis.decision === "partial" && analysis.coveragePercentage !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coverage Percentage</span>
                  <span className="font-mono font-semibold">{analysis.coveragePercentage}%</span>
                </div>
                <Progress value={analysis.coveragePercentage} className="h-2" />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Policy Clauses</h4>
              <div className="space-y-2">
                {analysis.applicableClauses.map((clause, idx) => (
                  <div key={idx} className="rounded-md border border-border p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">{clause.clauseId}</span>
                      {clause.applies ? (
                        <Badge variant="outline" className="text-green-600">Applies</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Does Not Apply</Badge>
                      )}
                    </div>
                    <p className="text-sm">{clause.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {analysis.policyTerms.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Relevant Policy Terms</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.policyTerms.map((term, idx) => (
                    <Badge key={idx} variant="secondary">{term}</Badge>
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
