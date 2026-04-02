from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.store import resume_store
from app.services.matcher import match_jd

router = APIRouter()


class JDRequest(BaseModel):
    jd_text: str


@router.post("/submit-jd")
async def submit_jd(body: JDRequest):
    if not resume_store["resume_text"]:
        raise HTTPException(status_code=400, detail="No resume uploaded yet.")
    if not body.jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description is empty.")

    resume_store["jd_text"] = body.jd_text
    match_result = match_jd(resume_store["resume_text"], body.jd_text)
    resume_store["match_result"] = match_result

    return {"success": True, "match_result": match_result}
