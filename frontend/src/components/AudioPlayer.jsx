import React, { useState, useRef } from "react";
import { Play, Pause, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AudioPlayer({ text, sceneId, voice = "onyx", label = "Ascolta il diario" }) {
  const [state, setState] = useState("idle"); // idle | loading | ready | playing | error
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const toggle = async () => {
    if (state === "playing") {
      audioRef.current?.pause();
      setState("ready");
      return;
    }
    if (state === "ready" && audioRef.current) {
      audioRef.current.play();
      setState("playing");
      return;
    }
    setState("loading");
    setError(null);
    try {
      const res = await fetch(`${API}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, scene_id: sceneId }),
      });
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = new Audio(url);
      audioRef.current = a;
      a.onended = () => setState("ready");
      a.onerror = () => { setState("error"); setError("Riproduzione fallita"); };
      a.play();
      setState("playing");
    } catch (e) {
      console.error(e);
      setState("error");
      setError("Generazione audio non riuscita");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={toggle}
        data-testid={`audio-toggle-${sceneId}`}
        aria-label={label}
        className="wax-button w-14 h-14 flex items-center justify-center"
      >
        {state === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
        {state === "playing" && <Pause className="w-5 h-5" />}
        {(state === "idle" || state === "ready" || state === "error") && <Play className="w-5 h-5 ml-0.5" />}
      </button>
      <div className="font-accent text-xs text-[var(--ink-2)]">
        {state === "loading" && "Incidendo la voce..."}
        {state === "playing" && "La voce di Ripa..."}
        {state === "ready" && "Pausa"}
        {state === "idle" && label}
        {state === "error" && (error || "Errore")}
      </div>
    </div>
  );
}
