export interface CVStructure {
  summary: string;
  experience: ExperienceItem[] | string;
  skills: string[];
  education: string;
}

export interface ExperienceItem {
  title: string;
  years: number;
  details: string;
}

export interface CVReviewIssue {
  section: "summary" | "experience" | "skills" | "education" | "general";
  problem: string;
  reason?: string;
  suggestion: string;
  severity: "low" | "medium" | "high";
}

export interface CVReviewResult {
  issues: CVReviewIssue[];
}

export interface JDStructure {
  required_skills: string[];
  years_experience: number;
  responsibilities: string[];
}

export interface CVJDMatch {
  jd_item: string;
  cv_evidence: string;
}

export interface CVJDMissing {
  jd_item: string;
  reason: string;
}

export interface CVJDScore {
  skills: number;
  experience: number;
  overall: number;
}

export interface CVJDCompareResult {
  matches: CVJDMatch[];
  missing: CVJDMissing[];
  score: CVJDScore;
}

export type SkillEvidence = {
  skill: string;
  verb: string;
  sentence_text: string;
  confidence: number;
};

export type CVInsightSummary = {
  strongSkills: { skill: string; evidence: string }[];
  mediumSkills: string[];
  weakClaims: string[];
  experienceHighlights: string[];
  // missingSignals: {
  //   impact: boolean;
  //   metrics: boolean;
  // };
};
