"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2, Sparkles } from "lucide-react";
import { uploadResume } from "@/lib/api";
import { ATSResult } from "@/lib/types";

interface UploadStepProps {
  onComplete: (ats: ATSResult) => void;
}

export default function UploadStep({ onComplete }: UploadStepProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    setFile(f);
    setError("");
    setLoading(true);
    try {
      const data = await uploadResume(f);
      onComplete(data.ats_result);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setError(msg);
      setLoading(false);
    }
  }, [onComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8 max-w-xl mx-auto pt-8"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-light text-xs font-mono px-3 py-1.5 rounded-full">
          <Sparkles size={12} />
          Step 1 of 4
        </div>
        <h2 className="text-3xl font-display font-bold text-text-primary">Upload Resume</h2>
        <p className="text-text-secondary text-sm">Drop a PDF resume to begin AI-powered analysis</p>
      </div>

      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300
          ${isDragActive ? "border-accent bg-accent/5 glow-accent" : "border-border hover:border-accent/50 hover:bg-card"}
          ${loading ? "pointer-events-none opacity-70" : ""}
        `}
      >
        <input {...getInputProps()} />

        {loading ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Loader2 size={28} className="text-accent animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-text-primary font-medium">Analyzing resume...</p>
              <p className="text-text-secondary text-sm mt-1">Running ATS scoring with LLaMA 3</p>
            </div>
            <div className="w-48 h-1 bg-border rounded-full overflow-hidden mt-2">
              <div className="h-full bg-accent rounded-full animate-pulse w-2/3" />
            </div>
          </>
        ) : file ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
              <FileText size={28} className="text-success" />
            </div>
            <p className="text-text-primary font-medium">{file.name}</p>
            <p className="text-text-secondary text-sm">Processing...</p>
          </>
        ) : (
          <>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isDragActive ? "bg-accent/20" : "bg-muted"}`}>
              <Upload size={28} className={isDragActive ? "text-accent" : "text-text-secondary"} />
            </div>
            <div className="text-center">
              <p className="text-text-primary font-medium">
                {isDragActive ? "Drop it here" : "Drag & drop PDF here"}
              </p>
              <p className="text-text-secondary text-sm mt-1">or click to browse files</p>
            </div>
            <span className="tag-blue">PDF only · Max 10MB</span>
          </>
        )}
      </div>

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-danger text-sm font-mono">
          ⚠ {error}
        </motion.p>
      )}
    </motion.div>
  );
}
