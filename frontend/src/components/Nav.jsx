import React, { useEffect, useState } from "react";

const LINKS = [
  { id: "scena-1", label: "Diario" },
  { id: "mappa-viaggio", label: "Rotta" },
  { id: "archivio", label: "Archivio" },
  { id: "jehol", label: "Jehol" },
  { id: "cronologia", label: "Cronologia" },
  { id: "epilogo", label: "Epilogo" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-testid="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-[var(--paper-1)]/92 backdrop-blur-md border-b border-[var(--border-warm)]/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className={`font-headings text-xl md:text-2xl tracking-tight ${scrolled ? "text-[var(--ink-1)]" : "text-[var(--paper-1)]"}`}>
          M. Ripa <span className="font-accent text-[10px] ml-2 text-[var(--cinnabar)]">MDCCXXXII</span>
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-testid={`nav-link-${l.id}`}
                className={`font-accent text-[10px] tracking-widest hover:text-[var(--cinnabar)] transition-colors ${
                  scrolled ? "text-[var(--ink-2)]" : "text-[var(--paper-2)]/90"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
