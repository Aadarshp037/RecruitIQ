"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";
import { sendChat } from "@/lib/api";
import { ChatMessage } from "@/lib/types";
import ReactMarkdown from "react-markdown";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTED = [
  "Is this candidate a good fit?",
  "What are the biggest skill gaps?",
  "Would you recommend hiring them?",
  "What questions should I ask in the interview?",
];

export default function ChatModal({ open, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I've analyzed the resume and job description. Ask me anything about this candidate — fit, skills, interview questions, or hiring recommendation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const data = await sendChat(msg, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Bot size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">AI Hiring Assistant</p>
                  <p className="text-xs text-text-muted">LLaMA 3 · Groq</p>
                </div>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors p-1">
                <X size={18} />
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border text-xs shadow-sm transition-all duration-300
                    ${m.role === "assistant" 
                      ? "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20" 
                      : "bg-muted border-border text-text-secondary hover:text-text-primary"}`}
                  >
                    {m.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                  </div>

                  {/* Content Bubble */}
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm break-words overflow-hidden transition-all duration-300
                    ${m.role === "assistant"
                      ? "bg-card border border-border text-text-secondary rounded-tl-sm hover:border-border/80"
                      : "bg-gradient-to-r from-accent to-accent-light text-white rounded-tr-sm shadow-indigo-500/10 hover:shadow-indigo-500/20"}`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none text-text-secondary hover:text-text-primary leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-accent-light prose-strong:text-text-primary">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs">
                    <Bot size={14} className="text-accent" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center justify-center min-h-[40px]">
                    <div className="flex items-center gap-1.5 px-1 py-1">
                      <motion.span
                        animate={{ y: ["0px", "-6px", "0px"] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                        className="w-2 h-2 rounded-full bg-accent"
                      />
                      <motion.span
                        animate={{ y: ["0px", "-6px", "0px"] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                        className="w-2 h-2 rounded-full bg-accent"
                      />
                      <motion.span
                        animate={{ y: ["0px", "-6px", "0px"] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        className="w-2 h-2 rounded-full bg-accent"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTED.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="text-xs bg-card border border-border hover:border-accent/50 text-text-secondary hover:text-accent px-3 py-1.5 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-border">
              <div className="flex gap-2 bg-card border border-border rounded-xl overflow-hidden focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15 transition-all duration-300">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Ask about this candidate..."
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="px-4 text-accent hover:text-accent-light disabled:opacity-30 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
