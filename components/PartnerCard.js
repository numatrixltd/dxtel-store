"use client";

import { BRANDS } from "@/lib/partnersData";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone } from "lucide-react";

const brandMeta = (key) => BRANDS.find((b) => b.key === key) || BRANDS[0];

// Simple heuristic to pick a readable text color against a solid brand fill.
// Falls back to white, which works for the mid-saturation brand hexes this
// app uses; swap for a real luminance check if a very light brand color
// ever gets added to BRANDS.
const onBrand = () => "#FFFFFF";

export default function PartnerCard({ partner, isSelected, onSelect }) {
  const meta = brandMeta(partner.brand);

  const locationTrail = [
    partner.division,
    partner.district,
    partner.thana,
  ].filter((v) => v && v !== "#N/A");

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={() => onSelect(partner)}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
      style={
        isSelected
          ? { boxShadow: `0 0 0 2px ${meta.color}`, borderColor: "transparent" }
          : undefined
      }
    >
      {/* brand rail */}
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: meta.color }}
      />

      <div className="flex flex-1 flex-col p-5 pt-6">
        {/* brand mark */}
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-display text-[12px] font-bold"
            style={{ backgroundColor: meta.color, color: onBrand() }}
          >
            {meta.label?.[0]?.toUpperCase() ?? "P"}
          </span>
          <span
            className="text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: meta.color }}
          >
            {meta.label}
          </span>
        </div>

        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {partner.name}
        </h3>

        <p className="mt-4 flex items-start gap-2 text-[13px] text-slate-500">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
          <span className="line-clamp-2">{partner.address}</span>
        </p>

        {/* location hierarchy, rendered as a real breadcrumb since the data
            genuinely nests: division > district > thana */}
        {locationTrail.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1 text-xs font-medium text-slate-500">
            {locationTrail.map((level, i) => (
              <span key={`${i}-${level}`} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
                <span
                  className={
                    i === locationTrail.length - 1
                      ? "text-slate-700"
                      : undefined
                  }
                >
                  {level}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* contract stub */}
      {partner.contract && (
        <div className="relative mt-auto px-5 pb-4">
          <div
            className="relative border-t border-dashed border-slate-300 pt-3"
            aria-hidden="false"
          >
            <span className="absolute -left-[9px] -top-[7px] h-3 w-3 rounded-full border border-slate-300 bg-white" />
            <span className="absolute -right-[9px] -top-[7px] h-3 w-3 rounded-full border border-slate-300 bg-white" />

            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-12"
                style={{
                  backgroundColor: `${meta.color}1A`,
                  color: meta.color,
                }}
              >
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-slate-500">
                {partner.contract}
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.button>
  );
}
