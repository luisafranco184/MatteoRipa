import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { ARCHIVE_SOURCES } from "../data/scenes";

export default function Archive() {
  const [open, setOpen] = useState(null);

  return (
    <section id="archivio" data-testid="archive-section" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-3xl">
          <div className="font-accent text-xs text-[var(--cinnabar)] mb-3">Sezione Documentaria</div>
          <h2 className="font-headings text-4xl md:text-6xl leading-tight">L'Archivio delle Fonti</h2>
          <p className="font-quill italic text-lg text-[var(--ink-2)] mt-4 leading-relaxed">
            Le carte originali — passaporti, stemmi, giornali di bordo, mappe — che custodiscono la memoria di un viaggio fra due mondi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {ARCHIVE_SOURCES.map((src, i) => (
            <motion.button
              key={src.id}
              type="button"
              data-testid={`archive-item-${src.id}`}
              onClick={() => setOpen(src)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="text-left group focus:outline-none"
            >
              <div className="relative frame-antique p-2 overflow-hidden">
                <img
                  src={src.image}
                  alt={src.title}
                  className="sepia-img w-full h-[420px] object-cover"
                />
                <div className="absolute top-4 right-4 wax-button w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-headings text-2xl md:text-3xl leading-tight">{src.title}</h3>
                <span className="font-accent text-xs text-[var(--cinnabar)] whitespace-nowrap">{src.year}</span>
              </div>
              <p className="font-body text-base text-[var(--ink-2)] mt-2 leading-relaxed">{src.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          style={{ background: "rgba(20, 14, 8, 0.85)" }}
          onClick={() => setOpen(null)}
          data-testid="archive-modal"
        >
          <button
            type="button"
            data-testid="archive-modal-close"
            onClick={() => setOpen(null)}
            className="absolute top-6 right-6 wax-button w-12 h-12 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <img src={open.image} alt={open.title} className="max-h-[78vh] w-full object-contain" />
            <div className="text-center text-[var(--paper-2)]">
              <div className="font-accent text-xs text-[var(--cinnabar)]">{open.year}</div>
              <div className="font-headings text-2xl mt-1">{open.title}</div>
              <p className="font-quill italic text-sm mt-2 max-w-2xl mx-auto">{open.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
