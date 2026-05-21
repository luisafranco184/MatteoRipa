import React from "react";
import "@/App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Scene from "./components/Scene";
import JourneyMap from "./components/JourneyMap";
import Archive from "./components/Archive";
import JeholGallery from "./components/JeholGallery";
import Timeline from "./components/Timeline";
import Epilogue from "./components/Epilogue";
import { SCENES } from "./data/scenes";

function App() {
  return (
    <div className="App" id="top">
      <Nav />
      <Hero />

      {/* Scene narrative */}
      <main>
        {SCENES.map((s, i) => (
          <Scene scene={s} index={i} key={s.id} />
        ))}

        <JeholGallery />
        <JourneyMap />
        <Archive />
        <Timeline />
        <Epilogue />
      </main>

      <footer className="bg-[var(--ink-1)] text-[var(--paper-2)] py-12 text-center">
        <div className="font-accent text-[10px] tracking-[0.4em] text-[var(--cinnabar)]">DIARIO DI MATTEO RIPA · 1682 — 1746</div>
        <div className="font-quill italic text-sm mt-3 text-[var(--paper-2)]/70">
          Storytelling autobiografico · Fonti: Giornale, Bolla «Nuper pro», Archivio del Collegio dei Cinesi
        </div>
      </footer>
    </div>
  );
}

export default App;
