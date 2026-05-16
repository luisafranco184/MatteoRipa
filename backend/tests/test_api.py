"""Backend API tests for Diario di Matteo Ripa."""
import os
import requests
import pytest
from pathlib import Path

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://matteo-ripa-diario.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# Health & root
def test_health():
    r = requests.get(f"{API}/health", timeout=30)
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_root():
    r = requests.get(f"{API}/", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Matteo Ripa" in data["message"]


# TTS endpoint
def test_tts_generates_audio():
    payload = {
        "text": "Sono Matteo Ripa, nato a Eboli nel 1682.",
        "voice": "onyx",
        "scene_id": "test-scene",
    }
    r = requests.post(f"{API}/tts", json=payload, timeout=90)
    assert r.status_code == 200, f"got {r.status_code}: {r.text[:300]}"
    assert r.headers.get("content-type", "").startswith("audio/mpeg")
    assert len(r.content) > 1024, f"audio too small: {len(r.content)} bytes"


def test_tts_cache_hit_fast_and_file_exists():
    payload = {
        "text": "Frase di test per la cache audio del diario.",
        "voice": "onyx",
        "scene_id": "cache-test",
    }
    # first call (may be slow)
    r1 = requests.post(f"{API}/tts", json=payload, timeout=90)
    assert r1.status_code == 200
    # second call (should hit cache)
    r2 = requests.post(f"{API}/tts", json=payload, timeout=30)
    assert r2.status_code == 200
    assert r2.headers.get("content-type", "").startswith("audio/mpeg")
    assert r1.content == r2.content
    # confirm a file exists in audio_cache
    cache_dir = Path("/app/backend/audio_cache")
    assert cache_dir.exists()
    mp3s = list(cache_dir.glob("*.mp3"))
    assert len(mp3s) > 0


def test_tts_validation_empty_text():
    r = requests.post(f"{API}/tts", json={"text": "", "voice": "onyx"}, timeout=30)
    assert r.status_code == 422
