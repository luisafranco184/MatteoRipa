import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { JOURNEY_STOPS } from "../data/scenes";

// Fix default markers icon for Leaflet via CDN (avoids missing img)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom red cinnabar marker
const cinnabarIcon = L.divIcon({
  className: "custom-cinnabar-marker",
  html: `<div style="width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 30% 30%, #d23a3a, #9b2c2c 70%);box-shadow:0 2px 8px rgba(120,30,30,0.55), inset 0 1px 2px rgba(255,255,255,0.4);border:1.5px solid #fdf8ef"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [points, map]);
  return null;
}

export default function JourneyMap() {
  const points = JOURNEY_STOPS.map((s) => s.coords);

  return (
    <section
      id="mappa-viaggio"
      data-testid="journey-map-section"
      className="py-24 md:py-32 bg-[var(--paper-2)]/40 border-y border-[var(--border-warm)]/60"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="font-accent text-xs text-[var(--cinnabar)] mb-3">Carta della Rotta</div>
            <h2 className="font-headings text-4xl md:text-6xl leading-tight">
              Le tappe del viaggio
              <span className="block italic text-[var(--ink-2)] text-2xl md:text-3xl mt-2 font-normal">
                Napoli · Londra · Capo · Pechino · Jehol · Napoli
              </span>
            </h2>
          </div>
          <p className="font-quill italic text-[var(--ink-2)] max-w-md text-lg leading-relaxed">
            Diciannove anni di rotte fra l'Europa e l'Impero del Dragone. Ogni sigillo è una tappa, ogni linea un'onda solcata.
          </p>
        </div>

        <div className="frame-antique p-3 rounded-none overflow-hidden">
          <div className="sepia-map" data-testid="leaflet-map" style={{ height: "560px", width: "100%" }}>
            <MapContainer
              center={[30, 60]}
              zoom={2}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", background: "#e8d9bd" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline
                positions={points}
                pathOptions={{ color: "#9b2c2c", weight: 2.5, dashArray: "6 8", opacity: 0.85 }}
              />
              {JOURNEY_STOPS.map((stop, i) => (
                <Marker key={stop.id + i} position={stop.coords} icon={cinnabarIcon}>
                  <Popup>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.15em", color: "#9b2c2c", textTransform: "uppercase" }}>{stop.year}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, margin: "4px 0" }}>{stop.name}</div>
                      <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: 14, color: "#4a4238" }}>{stop.note}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <FitBounds points={points} />
            </MapContainer>
          </div>
        </div>

        {/* Legend / list */}
        <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4 text-sm">
          {JOURNEY_STOPS.map((s, i) => (
            <li key={s.id + i} className="border-l-2 border-[var(--cinnabar)]/70 pl-3" data-testid={`stop-${s.id}-${i}`}>
              <div className="font-accent text-[10px] text-[var(--ink-2)]">{s.year}</div>
              <div className="font-headings text-lg">{s.name}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
