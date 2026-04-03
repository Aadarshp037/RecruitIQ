import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecruitIQ — AI Hiring Assistant",
  description: "AI-powered resume analysis, ATS scoring, and candidate evaluation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink text-text-primary antialiased">{children}</body>
    </html>
  );
}
