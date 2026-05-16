from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import hashlib
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (kept available, even if minimal use)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Audio cache directory
AUDIO_CACHE_DIR = ROOT_DIR / "audio_cache"
AUDIO_CACHE_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Diario di Matteo Ripa API")
api_router = APIRouter(prefix="/api")


class TTSRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=4000)
    voice: str = Field(default="onyx")
    scene_id: Optional[str] = None


@api_router.get("/")
async def root():
    return {"message": "Diario di Matteo Ripa — API attiva"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/tts")
async def generate_tts(req: TTSRequest):
    """Generate (or fetch from cache) audio narration via OpenAI TTS using the Emergent universal key."""
    # Stable cache key
    key = hashlib.sha256(f"{req.voice}|{req.text}".encode()).hexdigest()[:24]
    filename = f"{req.scene_id or key}_{key}.mp3"
    file_path = AUDIO_CACHE_DIR / filename

    if not file_path.exists():
        try:
            from emergentintegrations.llm.openai import OpenAITextToSpeech
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"TTS library import error: {e}")

        api_key = os.environ.get("EMERGENT_LLM_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY non configurato")

        try:
            tts = OpenAITextToSpeech(api_key=api_key)
            audio_bytes = await tts.generate_speech(
                text=req.text,
                model="tts-1",
                voice=req.voice,
                response_format="mp3",
                speed=0.95,
            )
            with open(file_path, "wb") as f:
                f.write(audio_bytes)
        except Exception as e:
            logger.exception("TTS generation failed")
            raise HTTPException(status_code=500, detail=f"Generazione TTS fallita: {e}")

    return FileResponse(str(file_path), media_type="audio/mpeg", filename=filename)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
