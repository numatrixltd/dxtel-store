"use client";

import { BRANDS } from "@/lib/partnersData";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone } from "lucide-react";

const brandMeta = (key) => BRANDS.find((b) => b.key === key) || BRANDS[0];

export default function PartnerListRow({ partner, isSelected, onSelect }) {
  const meta = brandMeta(partner.brand);

  const locationTrail = [
    partner.division,
    partner.district,
    partner.thana,
  ].filter((v) => v && v !== "#N/A");

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onSelect(partner)}
      className="group relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 pl-5 text-left shadow-sm transition-all hover:border-slate-300 hover:shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-5 sm:pl-6"
      style={
        isSelected
          ? { boxShadow: `0 0 0 2px ${meta.color}`, borderColor: "transparent" }
          : undefined
      }
    >
      {/* brand rail */}
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: meta.color }}
      />

      <div className="flex items-start gap-4 sm:contents">
        {/* brand mark */}
        <span className="flex h-10 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 p-2">
          {meta.logo ? (
            <img
              src={meta.logo}
              alt={meta.label}
              className="h-full w-full object-contain"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center font-display text-[12px] font-bold text-white"
              style={{ backgroundColor: meta.color }}
            >
              {meta.label?.[0]?.toUpperCase() ?? "P"}
            </span>
          )}
        </span>

       
        {/* Name + address */}
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-semibold leading-snug text-ink sm:truncate sm:text-base">
            {partner.name}
          </h3>
          <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 sm:text-sm">
            <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="sm:line-clamp-1">{partner.address}</span>
          </p>
        </div>
      </div>

      {/* Location breadcrumb */}
      {locationTrail.length > 0 && (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-1 pl-12 text-xs font-medium text-slate-500 sm:w-52 sm:pl-0">
          {locationTrail.map((level, i) => (
            <span key={`${i}-${level}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
              <span
                className={
                  i === locationTrail.length - 1 ? "text-slate-700" : undefined
                }
              >
                {level}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Contract */}
      {partner.contract && (
        <div className="flex flex-shrink-0 items-center gap-3 pl-12 sm:w-28 sm:justify-end sm:pl-0">
          <span
            className="flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] tracking-wide"
            style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
          >
            <Phone className="h-3 w-3" />
            {partner.contract}
          </span>
        </div>
      )}
    </motion.button>
  );
}
