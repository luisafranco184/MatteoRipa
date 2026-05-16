import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { JEHOL_VIEWS } from "../data/scenes";

export default function JeholGallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="jehol" data-testid="jehol-section" className="py-24 md:py-32 bg-[var(--paper-2)]/50 border-y border-[var(--border-warm)]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-3xl">
          <div className="font-accent text-xs text-[var(--cinnabar)] mb-3">Iconografia · Pechino</div>
          <h2 className="font-headings text-4xl md:text-6xl leading-tight">
            Le 36 Vedute della Villa Imperiale di Jehol
          </h2>
          <p className="font-quill italic text-lg text-[var(--ink-2)] mt-4 leading-relaxed">
            «Per ordine dell'Imperatore Kangxi, incisi su rame le trentasei vedute del suo ritiro estivo in Tartaria. Ogni veduta è un soffio del paradiso che lo circondava.»
          </p>
          <p className="font-body text-sm text-[var(--ink-2)]/80 mt-3">
            Tavole storiche estratte dal volume di studi su Matteo Ripa (Università L'Orientale, Napoli).
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {JEHOL_VIEWS.map((v, i) => (
            <motion.button
              type="button"
              key={v.id}
              data-testid={`jehol-view-${v.number}`}
              onClick={() => setActive(v)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: (i % 12) * 0.04 }}
              className="group relative aspect-[4/5] overflow-hidden bg-[var(--paper-1)] border border-[var(--border-warm)] focus:outline-none"
            >
              <img
                src={v.image}
                alt={v.title}
                className="sepia-img w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-1)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-[var(--paper-1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                <div className="font-accent text-[10px] text-[var(--cinnabar)]">N° {v.number}</div>
                <div className="font-headings text-sm leading-tight">{v.title}</div>
              </div>
              <div className="absolute top-2 left-2 font-accent text-[10px] text-[var(--cinnabar)] bg-[var(--paper-1)]/85 px-2 py-0.5">
                {String(v.number).padStart(2, "0")}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          style={{ background: "rgba(20, 14, 8, 0.9)" }}
          onClick={() => setActive(null)}
          data-testid="jehol-modal"
        >
          <button
            type="button"
            data-testid="jehol-modal-close"
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 wax-button w-12 h-12 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-5xl flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img src={active.image} alt={active.title} className="max-h-[80vh] object-contain" />
            <div className="text-center text-[var(--paper-2)]">
              <div className="font-accent text-xs text-[var(--cinnabar)]">Veduta N° {active.number}</div>
              <div className="font-headings text-2xl mt-1">{active.title}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
