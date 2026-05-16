import React from "react";
import { motion } from "framer-motion";

export default function Epilogue() {
  return (
    <section id="epilogo" data-testid="epilogue-section" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--paper-1) 0%, var(--paper-2) 40%, #2b2520 100%)" }} />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="font-accent text-xs text-[var(--cinnabar)] mb-6">Epilogo</div>
          <h2 className="font-headings text-4xl md:text-6xl leading-tight">L'Eredità Immortale</h2>

          <p className="font-quill italic text-2xl md:text-3xl text-[var(--ink-1)] mt-10 leading-relaxed">
            «Hic jacet corpus<br />Matthaei Ripae»
          </p>

          <div className="rule-ornament my-12">
            <span className="font-accent text-xs">1746 → oggi</span>
          </div>

          <p className="font-body text-lg md:text-xl text-[var(--paper-1)] leading-relaxed">
            Il Collegio mutò nome — Real Collegio Asiatico, poi Istituto Orientale —
            ma il bulino che ha inciso quella mappa continua a tracciare rotte.
            Oggi, a Palazzo Corigliano, ogni parola cinese pronunciata sotto quelle volte
            è una pagina ancora aperta del diario di Matteo Ripa.
          </p>

          <div className="mt-12 font-accent text-[10px] tracking-[0.4em] text-[var(--paper-2)]/70">
            UNIVERSUM MUNDUM PRAEDICATE EVANGELIUM
          </div>
        </motion.div>
      </div>
    </section>
  );
}
