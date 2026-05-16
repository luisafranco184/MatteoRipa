import React from "react";

const EVENTS = [
  { year: "1682", text: "Nasce ad Eboli (Salerno) il 29 marzo." },
  { year: "1705", text: "26 novembre — Parte da Napoli verso Roma." },
  { year: "1707", text: "Ordinazione sacerdotale. Missione di Propaganda Fide per la Cina." },
  { year: "1708", text: "Imbarco sul vascello Donegal. Dieci mesi di mare." },
  { year: "1711", text: "Arrivo a Pechino. Diventa pittore-incisore di Kangxi." },
  { year: "1713", text: "Incide su rame le 36 vedute della villa imperiale di Jehol." },
  { year: "1717", text: "Pubblica la Grande Mappa dell'Impero in 44 tavole." },
  { year: "1724", text: "Ritorno via Londra. Dona la mappa a Re Giorgio I." },
  { year: "1732", text: "7 aprile — Bolla «Nuper pro». Nasce il Collegio dei Cinesi." },
  { year: "1746", text: "29 marzo — Muore a Napoli, nel giorno del suo compleanno." },
];

export default function Timeline() {
  return (
    <section id="cronologia" data-testid="timeline-section" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <div className="font-accent text-xs text-[var(--cinnabar)] mb-3">Cronologia</div>
          <h2 className="font-headings text-4xl md:text-5xl leading-tight">Le date essenziali</h2>
        </div>

        <ol className="relative border-l border-[var(--border-warm)] ml-2">
          {EVENTS.map((e, i) => (
            <li key={e.year + i} className="ml-8 mb-10" data-testid={`timeline-${e.year}`}>
              <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-[var(--cinnabar)] ring-4 ring-[var(--paper-1)]"></span>
              <div className="font-accent text-xs text-[var(--cinnabar)] tracking-widest">{e.year}</div>
              <div className="font-body text-lg md:text-xl text-[var(--ink-1)] mt-1 leading-relaxed">{e.text}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
