"use client";
import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  color?: string;
  label?: string;
}

export default function ScoreRing({ score, size = 120, color = "#6366F1", label }: ScoreRingProps) {
  const [animated, setAnimated] = useState(false);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const getColor = (s: number) => {
    if (s >= 80) return "#10B981";
    if (s >= 60) return "#6366F1";
    if (s >= 40) return "#F59E0B";
    return "#EF4444";
  };

  const ringColor = getColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Background ring */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#1E1E2E" strokeWidth="8" />
        {/* Score ring */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          transform="rotate(-90 50 50)"
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            filter: `drop-shadow(0 0 8px ${ringColor}80)`,
          }}
        />
        {/* Score text */}
        <text x="50" y="46" textAnchor="middle" fill="#F0F0FF" fontSize="20" fontWeight="700" fontFamily="Syne, sans-serif">
          {animated ? score : 0}
        </text>
        <text x="50" y="60" textAnchor="middle" fill="#9494B8" fontSize="9" fontFamily="DM Sans, sans-serif">
          /100
        </text>
      </svg>
      {label && <span className="text-text-secondary text-xs font-mono">{label}</span>}
    </div>
  );
}
