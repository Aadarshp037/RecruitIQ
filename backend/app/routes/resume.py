from fastapi import APIRouter, UploadFile, File, HTTPException
import fitz  # PyMuPDF
from app.store import resume_store
from app.services.ats import analyze_ats

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

    resume_store["resume_text"] = text
    resume_store["ats_result"] = None
    resume_store["jd_text"] = ""
    resume_store["match_result"] = None

    ats_result = analyze_ats(text)
    resume_store["ats_result"] = ats_result

    return {"success": True, "ats_result": ats_result}
