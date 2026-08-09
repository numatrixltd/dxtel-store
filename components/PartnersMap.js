"use client";

import { useEffect, useRef } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const DHAKA_CENTER = [90.4125, 23.8103];

export default function PartnersMap({ partners, selectedPartner, onPartnerSelect, type }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  const geoPartners = partners.filter(
    (p) => Array.isArray(p.coordinates) && p.coordinates.length === 2
  );

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;

    if (!document.querySelector('link[href*="mapbox-gl"]')) {
      const link = document.createElement("link");
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    function initMap() {
      if (map.current || !window.mapboxgl) return;

      window.mapboxgl.accessToken = MAPBOX_TOKEN;

      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: DHAKA_CENTER,
        zoom: 9,
      });

      map.current.addControl(new window.mapboxgl.NavigationControl(), "top-right");
      renderMarkers();
    }

    function renderMarkers() {
      Object.values(markers.current).forEach((m) => m.remove());
      markers.current = {};

      geoPartners.forEach((partner) => {
        const el = document.createElement("div");
        const color = type === "retail" ? "#0F8B8D" : "#F2A93B";
        Object.assign(el.style, {
          backgroundColor: color,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          cursor: "pointer",
          border: "3px solid white",
          boxShadow: "0 3px 8px rgba(11,18,32,0.35)",
          transition: "transform 0.2s ease",
        });

        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.2)";
        });
        el.addEventListener("mouseleave", () => {
          if (selectedPartner?.id !== partner.id) el.style.transform = "scale(1)";
        });

        const popup = new window.mapboxgl.Popup({ offset: 20, closeButton: true }).setHTML(`
          <div style="padding:14px;max-width:220px;font-family:var(--font-body, sans-serif);">
            <h3 style="font-weight:700;font-size:14px;margin:0 0 6px;color:#0B1220;">${escapeHtml(
              partner.name
            )}</h3>
            <p style="font-size:12px;color:#5B6472;margin:0 0 8px;">${escapeHtml(
              partner.address
            )}</p>
            <p style="font-size:12px;color:#5B6472;margin:0;">${escapeHtml(
              partner.phone || "Contact via head office"
            )}</p>
          </div>
        `);

        const marker = new window.mapboxgl.Marker(el)
          .setLngLat(partner.coordinates)
          .setPopup(popup)
          .addTo(map.current);

        markers.current[partner.id] = marker;
        el.addEventListener("click", () => onPartnerSelect(partner));
      });
    }

    if (!window.mapboxgl) {
      const script = document.createElement("script");
      script.src = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
      renderMarkers();
    }

    return () => {
      Object.values(markers.current).forEach((m) => m.remove());
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partners, type]);

  useEffect(() => {
    if (!map.current || !selectedPartner || !MAPBOX_TOKEN) return;
    if (!Array.isArray(selectedPartner.coordinates)) return;

    map.current.flyTo({ center: selectedPartner.coordinates, zoom: 14, duration: 1200 });

    Object.entries(markers.current).forEach(([id, marker]) => {
      const el = marker.getElement();
      el.style.transform = Number(id) === selectedPartner.id ? "scale(1.3)" : "scale(1)";
    });

    if (markers.current[selectedPartner.id]) {
      markers.current[selectedPartner.id].togglePopup();
    }
  }, [selectedPartner]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full min-h-[420px] w-full flex-col items-center justify-center gap-2 bg-slate-50 p-8 text-center">
        <p className="font-display text-sm font-semibold text-slate-600">
          Map preview unavailable
        </p>
        <p className="max-w-xs text-xs text-slate-400">
          Add a <code className="rounded bg-slate-200 px-1 py-0.5">NEXT_PUBLIC_MAPBOX_TOKEN</code>{" "}
          to your <code className="rounded bg-slate-200 px-1 py-0.5">.env.local</code> file to
          enable the live map.
        </p>
      </div>
    );
  }

  return <div ref={mapContainer} className="h-full min-h-[420px] w-full" />;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
