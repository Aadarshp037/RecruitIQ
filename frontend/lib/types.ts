export interface ATSResult {
  ats_score: number;
  grade: string;
  strengths: string[];
  weaknesses: string[];
  keywords_found: string[];
  keywords_missing: string[];
  summary: string;
}

export interface MatchResult {
  match_score: number;
  verdict: string;
  matched_skills: string[];
  missing_skills: string[];
  strengths: string[];
  improvements: string[];
  hiring_recommendation: string;
  summary: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type AppStep = "upload" | "ats" | "jd" | "match" | "chat";
