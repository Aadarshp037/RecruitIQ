import axios from "axios";
import { ATSResult, MatchResult, ChatMessage } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

export async function uploadResume(file: File): Promise<{ ats_result: ATSResult }> {
  const form = new FormData();
  form.append("file", file);
  const res = await api.post("/api/upload-resume", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function submitJD(jd_text: string): Promise<{ match_result: MatchResult }> {
  const res = await api.post("/api/submit-jd", { jd_text });
  return res.data;
}

export async function sendChat(
  message: string,
  history: ChatMessage[]
): Promise<{ reply: string }> {
  const res = await api.post("/api/chat", { message, history });
  return res.data;
}
