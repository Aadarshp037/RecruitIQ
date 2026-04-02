from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.store import resume_store
from app.services.groq_client import call_groq

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


SYSTEM_TEMPLATE = """You are an expert AI hiring assistant helping a recruiter evaluate a candidate.
You have access to the candidate's resume and the job description.

RESUME:
{resume}

JOB DESCRIPTION:
{jd}

ATS ANALYSIS:
{ats}

JD MATCH RESULT:
{match}

Answer recruiter questions concisely and professionally. Be direct, insightful, and data-driven.
If asked something outside resume/JD context, politely redirect."""


@router.post("/chat")
async def chat(body: ChatRequest):
    if not resume_store["resume_text"]:
        raise HTTPException(status_code=400, detail="No resume uploaded yet.")

    system_prompt = SYSTEM_TEMPLATE.format(
        resume=resume_store["resume_text"][:3000],
        jd=resume_store["jd_text"] or "Not provided yet.",
        ats=str(resume_store["ats_result"] or "Not analyzed yet."),
        match=str(resume_store["match_result"] or "Not matched yet."),
    )

    import os
    from groq import Groq
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

    messages = [{"role": "system", "content": system_prompt}]
    for h in body.history[-6:]:  # keep last 6 turns for context
        messages.append(h)
    messages.append({"role": "user", "content": body.message})

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages,
        temperature=0.5,
        max_tokens=512,
    )

    return {"reply": response.choices[0].message.content}
