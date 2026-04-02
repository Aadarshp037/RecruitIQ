"use client";
import { Upload, BarChart2, Briefcase, Target } from "lucide-react";
import { AppStep } from "@/lib/types";

const STEPS: { id: AppStep; label: string; icon: React.ReactNode }[] = [
  { id: "upload", label: "Upload", icon: <Upload size={14} /> },
  { id: "ats", label: "ATS Score", icon: <BarChart2 size={14} /> },
  { id: "jd", label: "Job Fit", icon: <Briefcase size={14} /> },
  { id: "match", label: "Report", icon: <Target size={14} /> },
];

interface StepperProps {
  current: AppStep;
}

export default function Stepper({ current }: StepperProps) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300
              ${active ? "bg-accent text-white shadow-lg shadow-accent/30" : done ? "text-emerald-400" : "text-text-muted"}`}>
              {step.icon}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-1 transition-colors duration-300 ${done ? "bg-emerald-500/50" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
