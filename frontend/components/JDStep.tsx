"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { submitJD } from "@/lib/api";
import { MatchResult } from "@/lib/types";

interface JDStepProps {
  onComplete: (match: MatchResult) => void;
}

export default function JDStep({ onComplete }: JDStepProps) {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await submitJD(jd);
      onComplete(data.match_result);
    } catch {
      setError("Failed to analyze JD. Please try again.");
      setLoading(false);
    }
  };

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
          Step 3 of 4 — Job Description
        </div>
        <h2 className="text-3xl font-display font-bold">Paste Job Description</h2>
        <p className="text-text-secondary text-sm">AI will compare the resume against this role</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-1">
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-border">
          <Briefcase size={14} className="text-accent" />
          <span className="text-xs font-mono text-text-muted">job_description.txt</span>
          <span className="ml-auto text-xs font-mono text-text-muted">{jd.length} chars</span>
        </div>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full job description here...

Example:
We are looking for a Software Engineer with 2+ years experience in React, Node.js, TypeScript...
Requirements:
- Strong knowledge of TypeScript and Next.js
- Experience with GCP or AWS
- Familiarity with Docker..."
          rows={14}
          className="w-full bg-transparent px-4 py-3 text-sm text-text-secondary placeholder:text-text-muted font-mono resize-none outline-none leading-relaxed"
        />
      </div>

      {error && (
        <p className="text-danger text-sm font-mono">⚠ {error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!jd.trim() || loading}
        className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 group"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Matching with AI...
          </>
        ) : (
          <>
            Analyze Fit
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </motion.div>
  );
}
