"use client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Tag, ArrowRight, Sparkles } from "lucide-react";
import { ATSResult } from "@/lib/types";
import ScoreRing from "./ScoreRing";

interface ATSStepProps {
  result: ATSResult;
  onNext: () => void;
}

const gradeColor: Record<string, string> = {
  A: "text-emerald-400",
  B: "text-indigo-400",
  C: "text-yellow-400",
  D: "text-orange-400",
  F: "text-red-400",
};

export default function ATSStep({ result, onNext }: ATSStepProps) {
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
          Step 2 of 4 — ATS Analysis
        </div>
        <h2 className="text-3xl font-display font-bold">Resume Score</h2>
      </div>

      {/* Score hero */}
      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8 glow-accent">
        <ScoreRing score={result.ats_score} size={140} />
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="text-text-secondary text-sm">Grade</span>
            <span className={`text-4xl font-display font-bold ${gradeColor[result.grade] || "text-text-primary"}`}>
              {result.grade}
            </span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">{result.summary}</p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle size={12} /> Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">▸</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-mono text-red-400 uppercase tracking-widest flex items-center gap-2">
            <XCircle size={12} /> Weaknesses
          </h3>
          <ul className="space-y-2">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-red-500 mt-0.5">▸</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Keywords */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest flex items-center gap-2">
          <Tag size={12} /> Keywords
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-text-muted mb-2">Found</p>
            <div className="flex flex-wrap gap-2">
              {result.keywords_found.map((k, i) => <span key={i} className="tag-green">{k}</span>)}
            </div>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-2">Missing</p>
            <div className="flex flex-wrap gap-2">
              {result.keywords_missing.map((k, i) => <span key={i} className="tag-red">{k}</span>)}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 group"
      >
        Match with Job Description
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
