import React from "react";
import { motion } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

export default function Scene({ scene, index }) {
  const reverse = index % 2 === 1;
  return (
    <section
      id={scene.id}
      data-testid={`scene-${scene.id}`}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Image */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="frame-antique p-3">
              <img
                src={scene.image}
                alt={scene.imageAlt}
                className="sepia-img w-full h-auto object-cover"
                style={{ aspectRatio: "4/5", objectFit: "cover" }}
                data-testid={`scene-image-${scene.id}`}
              />
            </div>
            <figcaption className="font-quill italic text-sm text-[var(--ink-2)] mt-4 leading-relaxed">
              {scene.imageCaption}
            </figcaption>
          </motion.figure>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 lg:pt-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-accent text-2xl text-[var(--cinnabar)]">{scene.number}</span>
              <span className="font-accent text-xs text-[var(--ink-2)]">{scene.date}</span>
              <span className="font-accent text-xs text-[var(--ink-2)]/70">· {scene.place}</span>
            </div>
            <h2 className="font-headings text-4xl md:text-5xl text-[var(--ink-1)] mb-6 leading-tight">
              {scene.title}
            </h2>
            <div className="rule-ornament mb-6">
              <span className="font-accent text-xs">Voce di Ripa</span>
            </div>
            <p className="font-body text-lg md:text-xl text-[var(--ink-1)]/90 leading-[1.75] drop-cap" data-testid={`scene-body-${scene.id}`}>
              {scene.body}
            </p>
            <div className="mt-8">
              <AudioPlayer text={scene.audioText} sceneId={scene.id} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
