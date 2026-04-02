"use client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, TrendingUp, MessageSquare, Sparkles } from "lucide-react";
import { MatchResult } from "@/lib/types";
import ScoreRing from "./ScoreRing";

interface MatchStepProps {
  result: MatchResult;
  onOpenChat: () => void;
}

const verdictStyle: Record<string, string> = {
  "Strong Match": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Good Match": "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  "Partial Match": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  "Weak Match": "text-red-400 bg-red-500/10 border-red-500/20",
};

const recStyle: Record<string, string> = {
  Recommend: "text-emerald-400",
  Consider: "text-yellow-400",
  Pass: "text-red-400",
};

export default function MatchStep({ result, onOpenChat }: MatchStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 max-w-2xl mx-auto pt-8"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-light text-xs font-mono px-3 py-1.5 rounded-full">
          <Sparkles size={12} />
          Step 4 of 4 — Match Report
        </div>
        <h2 className="text-3xl font-display font-bold">Candidate Fit Report</h2>
      </div>

      {/* Hero card */}
      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
        <ScoreRing score={result.match_score} size={140} />
        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className={`text-xs font-mono px-3 py-1 rounded-full border ${verdictStyle[result.verdict] || "text-text-secondary bg-muted border-border"}`}>
              {result.verdict}
            </span>
            <span className={`text-xs font-mono px-3 py-1 rounded-full border border-current/20 bg-current/10 ${recStyle[result.hiring_recommendation] || "text-text-secondary"}`}>
              {result.hiring_recommendation}
            </span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle size={12} /> Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matched_skills.map((s, i) => <span key={i} className="tag-green">{s}</span>)}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-mono text-red-400 uppercase tracking-widest flex items-center gap-2">
            <XCircle size={12} /> Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missing_skills.map((s, i) => <span key={i} className="tag-red">{s}</span>)}
          </div>
        </div>
      </div>

      {/* Improvements */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-mono text-yellow-400 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={12} /> Improvement Areas
        </h3>
        <ul className="space-y-2">
          {result.improvements.map((imp, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span> {imp}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat CTA */}
      <button
        onClick={onOpenChat}
        className="flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-indigo-500 hover:from-accent-light hover:to-indigo-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 group"
      >
        <MessageSquare size={18} />
        Ask AI About This Candidate
      </button>
    </motion.div>
  );
}
