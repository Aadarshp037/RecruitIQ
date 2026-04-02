from app.services.groq_client import call_groq, parse_json_response

SYSTEM_PROMPT = """You are an expert ATS (Applicant Tracking System) and HR analyst.
Analyze the given resume and return ONLY a JSON object with this exact structure:
{
  "ats_score": <integer 0-100>,
  "grade": "<A/B/C/D/F>",
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
  "keywords_found": ["<keyword1>", "<keyword2>"],
  "keywords_missing": ["<keyword1>", "<keyword2>"],
  "summary": "<2-3 sentence overall assessment>"
}
Return ONLY valid JSON. No explanation, no markdown."""


def analyze_ats(resume_text: str) -> dict:
    raw = call_groq(SYSTEM_PROMPT, f"Analyze this resume:\n\n{resume_text}")
    return parse_json_response(raw)
