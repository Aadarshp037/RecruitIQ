from app.services.groq_client import call_groq, parse_json_response

SYSTEM_PROMPT = """You are an expert technical recruiter and resume-job fit analyst.
Given a resume and a job description, return ONLY a JSON object with this exact structure:
{
  "match_score": <integer 0-100>,
  "verdict": "<Strong Match / Good Match / Partial Match / Weak Match>",
  "matched_skills": ["<skill1>", "<skill2>"],
  "missing_skills": ["<skill1>", "<skill2>"],
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"],
  "hiring_recommendation": "<Recommend / Consider / Pass>",
  "summary": "<3-4 sentence detailed summary>"
}
Return ONLY valid JSON. No explanation, no markdown."""


def match_jd(resume_text: str, jd_text: str) -> dict:
    user_prompt = f"RESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{jd_text}"
    raw = call_groq(SYSTEM_PROMPT, user_prompt)
    return parse_json_response(raw)
