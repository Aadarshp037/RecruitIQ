"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, MessageSquare } from "lucide-react";
import { ATSResult, MatchResult, AppStep } from "@/lib/types";
import UploadStep from "@/components/UploadStep";
import ATSStep from "@/components/ATSStep";
import JDStep from "@/components/JDStep";
import MatchStep from "@/components/MatchStep";
import ChatModal from "@/components/ChatModal";
import Stepper from "@/components/Stepper";

export default function Home() {
  const [step, setStep] = useState<AppStep>("upload");
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink bg-grid">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 backdrop-blur-md bg-ink/80">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-text-primary">HireIQ</span>
            <span className="hidden sm:inline text-xs font-mono text-text-muted ml-1">AI Hiring Assistant</span>
          </div>

          <div className="flex items-center gap-3">
            {step === "match" && (
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-1.5 text-xs font-mono text-accent border border-accent/30 hover:bg-accent/10 px-3 py-1.5 rounded-full transition-all"
              >
                <MessageSquare size={12} />
                Ask AI
              </button>
            )}
            <button
              onClick={() => { setStep("upload"); setAtsResult(null); setMatchResult(null); }}
              className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Stepper */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <Stepper current={step} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 pb-20">
        {step === "upload" && (
          <UploadStep
            onComplete={(ats) => { setAtsResult(ats); setStep("ats"); }}
          />
        )}

        {step === "ats" && atsResult && (
          <ATSStep
            result={atsResult}
            onNext={() => setStep("jd")}
          />
        )}

        {step === "jd" && (
          <JDStep
            onComplete={(match) => { setMatchResult(match); setStep("match"); }}
          />
        )}

        {step === "match" && matchResult && (
          <MatchStep
            result={matchResult}
            onOpenChat={() => setChatOpen(true)}
          />
        )}
      </main>

      {/* Hero for upload step */}
      {step === "upload" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-6 text-xs font-mono text-text-muted"
        >
          {["ATS Scoring", "JD Matching", "AI Chat"].map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              {f}
            </span>
          ))}
        </motion.div>
      )}

      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
