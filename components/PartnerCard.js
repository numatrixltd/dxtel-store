"use client";

import { BRANDS } from "@/lib/partnersData";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone } from "lucide-react";

const brandMeta = (key) => BRANDS.find((b) => b.key === key) || BRANDS[0];

const onBrand = () => "#FFFFFF";

export default function PartnerCard({ partner, isSelected, onSelect }) {
  const meta = brandMeta(partner.brand);

  const locationTrail = [
    partner.division,
    partner.district,
    partner.thana,
  ].filter((v) => v && v !== "#N/A");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
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

      <button
        type="button"
        onClick={() => onSelect(partner)}
        className="flex flex-1 flex-col p-5 pt-6 text-left"
      >
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
      </button>

      {/* contract stub — now a real Call Now action */}
      {partner.contract && (
        <div className="relative mt-auto px-5 pb-5">
          <div className="relative border-t border-dashed border-slate-300 pt-3">
            <span className="absolute -left-[9px] -top-[7px] h-3 w-3 rounded-full border border-slate-300 bg-white" />
            <span className="absolute -right-[9px] -top-[7px] h-3 w-3 rounded-full border border-slate-300 bg-white" />

            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] tracking-wide text-slate-500">
                {partner.contract}
              </span>

              <a
                href={`tel:${partner.contract}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: meta.color }}
              >
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
