# PRD — Diario di Matteo Ripa e la fondazione del Collegio dei Cinesi (1732)

## Problem Statement
Crea un progetto di digital storytelling in chiave autobiografica con la voce narrante di Matteo Ripa, strutturato come diario intimo che ripercorre le tappe della sua vita (1705-1746), basato su documenti storici e mappe delle fonti. Include 6 scene narrative, archivio fonti, mappa interattiva del viaggio, sezione 36 vedute di Jehol.

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + react-leaflet
- Backend: FastAPI con endpoint `/api/tts` (OpenAI TTS via Emergent LLM Key, voice "onyx", caching su disco)
- MongoDB disponibile (non utilizzato in questa MVP)
- Aesthetic: pergamena/inchiostro seppia, font Cormorant Garamond + EB Garamond + Cinzel + IM Fell English

## User Personas
- Studenti e ricercatori dell'Università L'Orientale / di sinologia
- Visitatori di mostre digitali / appassionati di storia delle missioni e dialogo Oriente-Occidente
- Pubblico generalista interessato a storytelling immersivi

## Core Requirements (static)
- 6 scene narrative con testo del diario, immagine storica e voce TTS italiana
- Mappa interattiva Leaflet con 10 tappe del viaggio (Napoli→Roma→Londra→Capo→Macao→Pechino→Jehol→Canton→Londra→Napoli)
- Archivio fonti con 4 documenti reali (passaporto, stemma, diario Donegal, mappa Cina) e lightbox
- Galleria 36 vedute di Jehol estratte dal PDF "Fatica Mostra.pdf"
- Cronologia di 10 eventi chiave
- Epilogo con lapide e legacy

## Implemented (2026-02)
- Hero immersivo con sfondo cinematico
- 6 scene scrollytelling con player audio (POST /api/tts → mp3) e cache
- Mappa Leaflet sepia con marker rossi cinabro e polyline tratteggiata
- Archive con frame antique + lightbox modal
- 36 vedute Jehol in grid responsive con modal
- Timeline verticale 10 eventi
- Epilogo con gradient finale e motto "Universum mundum praedicate Evangelium"
- Nav fissa che cambia stile allo scroll
- Testing: 100% backend + frontend pass (iteration_1.json)

## Next Action Items / Backlog
- P1: Pre-generare tutti gli audio TTS al build per evitare attesa al primo click
- P1: Standardizzare data-testid (timeline-event-*, journey-stop-*)
- P2: Tile layer mappa sepia nativo (es. Stamen Toner Lite) anziché filtro CSS
- P2: Includere model+speed nella cache key TTS
- P2: Aggiungere visualizzazione mobile più curata (carousel scene)
- P3: Versione bilingue IT/EN
- P3: Sezione "Crediti" e bibliografia accademica
