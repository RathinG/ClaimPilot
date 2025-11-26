import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const claims = pgTable("claims", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  policyNumber: text("policy_number").notNull(),
  vin: text("vin"),
  claimantName: text("claimant_name").notNull(),
  incidentDate: timestamp("incident_date").notNull(),
  incidentDescription: text("incident_description").notNull(),
  status: text("status").notNull().default("new"),
  priority: text("priority"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  photos: jsonb("photos").$type<string[]>(),
  coverageAnalysis: jsonb("coverage_analysis").$type<CoverageAnalysis>(),
  evidenceSummary: jsonb("evidence_summary").$type<EvidenceSummary>(),
  damageAssessment: jsonb("damage_assessment").$type<DamageAssessment>(),
  fraudAnalysis: jsonb("fraud_analysis").$type<FraudAnalysis>(),
  triageBrief: jsonb("triage_brief").$type<TriageBrief>(),
});

export const insertClaimSchema = createInsertSchema(claims).omit({
  id: true,
  createdAt: true,
  status: true,
  priority: true,
  coverageAnalysis: true,
  evidenceSummary: true,
  damageAssessment: true,
  fraudAnalysis: true,
  triageBrief: true,
});

export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claims.$inferSelect;

export type CoverageAnalysis = {
  decision: "covered" | "not_covered" | "partial";
  coveragePercentage?: number;
  applicableClauses: {
    clauseId: string;
    text: string;
    applies: boolean;
  }[];
  policyTerms: string[];
};

export type EvidenceSummary = {
  timeline: {
    time: string;
    event: string;
  }[];
  entities: {
    type: "person" | "location" | "vehicle" | "other";
    value: string;
  }[];
  contradictions: string[];
  confidence: number;
};

export type DamageAssessment = {
  damagedParts: {
    part: string;
    severity: "minor" | "moderate" | "severe";
  }[];
  impactAngle: string;
  severityScore: number;
  imageConsistency: boolean;
  photoFlags: string[];
};

export type FraudAnalysis = {
  riskScore: number;
  signals: {
    type: string;
    confidence: number;
    description: string;
  }[];
  photoReuseDetected: boolean;
  storyMismatch: boolean;
};

export type TriageBrief = {
  recommendation: "fast_track" | "adjuster" | "siu";
  summary: string;
  actionItems: string[];
  combinedConfidence: number;
  reasoning: string;
};
