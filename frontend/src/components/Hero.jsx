import React from "react";
import { motion } from "framer-motion";

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/702a5864-b6dc-444c-bacd-39a2d43654d2/images/0102d77dd80f8eb5756e96718fbbe6733e78f33129c5745ae5b13eb1cf84e24a.png";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden flex items-end"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Sepia + dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(43,37,32,0.35) 0%, rgba(43,37,32,0.55) 60%, var(--paper-1) 100%)" }} />
      <div className="absolute inset-0 mix-blend-multiply" style={{ background: "rgba(120, 85, 50, 0.20)" }} />

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="font-accent text-xs md:text-sm text-[var(--cinnabar)] mb-6">
              Napoli — 1705 / 1746 — Storytelling autobiografico
            </div>
            <h1 className="font-headings text-[var(--paper-1)] text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight">
              Diario di Matteo Ripa
              <span className="block italic font-normal text-[var(--paper-2)] text-3xl md:text-5xl mt-4">
                e la fondazione del Collegio dei Cinesi
              </span>
              <span className="block font-accent text-[var(--cinnabar)] text-2xl md:text-3xl mt-6">MDCCXXXII · 1732</span>
            </h1>
            <p className="font-quill italic text-white text-lg md:text-xl mt-8 max-w-2xl leading-relaxed" style={{textShadow: "0 2px 12px rgba(0,0,0,0.6)"}}>
              «Un napoletano alla corte del Dragone. Un bulino che incide mappe. Un ponte fra due mondi che, ancora oggi, continua a parlare cinese.»
            </p>
            <div className="mt-10 flex flex-wrap gap-6 items-center">
              <a
                href="#scena-1"
                data-testid="hero-cta-begin"
                className="wax-button px-7 py-3 font-accent text-sm"
              >
                Apri il diario
              </a>
              <a
                href="#mappa-viaggio"
                data-testid="hero-cta-map"
                className="font-accent text-xs text-[var(--paper-2)]/90 underline underline-offset-4 hover:text-[var(--paper-1)]"
              >
                Segui la rotta →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[var(--paper-2)]/70 font-accent text-[10px]"
      >
        ↓ Scendi nelle scene
      </motion.div>
    </section>
  );
}
