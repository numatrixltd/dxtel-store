"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Hash,
  MapPin,
  LayoutGrid,
  List as ListIcon,
  Loader2,
} from "lucide-react";
import { stores, BRANDS } from "@/lib/partnersData";
import PartnerCard from "@/components/PartnerCard";
import PartnerListRow from "@/components/PartnerListRow";
import useLazyReveal from "@/hooks/useLazyReveal";

const TABS = [
  { key: "all", label: "All Stores", color: "#0B1220", count: stores.length },
  ...BRANDS.map((b) => ({
    key: b.key,
    label: b.label,
    color: b.color,
    count: stores.filter((s) => s.brand === b.key).length,
  })),
];

const PAGE_SIZE = 12;

export default function AuthorizedPartners() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  const source =
    activeTab === "all" ? stores : stores.filter((s) => s.brand === activeTab);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source;
    return source.filter((p) =>
      [p.name, p.address, p.division, p.district, p.thana]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [source, query]);

  // Lazily reveal items in batches so a 100+ item list never renders all at
  // once on first paint. Resets whenever the tab or search query changes.
  const { visibleCount, sentinelRef, loadMore, hasMore, isLoadingMore } =
    useLazyReveal(filtered.length, PAGE_SIZE, activeTab + query);

  const visiblePartners = filtered.slice(0, visibleCount);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSelectedPartner(null);
  };

  return (
    <section className="relative bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-600">
            Store locator
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Find an authorized store near you
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            Browse all {stores.length}+ exclusive Xiaomi, Honor, Infinix,
            Realme, Tecno and Huawei stores across Bangladesh by name, division,
            or district.
          </p>
        </div>

        {/* Brand tabs */}
        <div className="mt-8 -mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
          <div className="inline-flex gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className="relative flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors sm:px-4"
                  style={{ color: isActive ? "#FFFFFF" : "#5B6472" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-brand-tab"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">
                    {tab.label}
                  </span>
                  <span
                    className="relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.2)"
                        : "#F1F5F9",
                      color: isActive ? "#FFFFFF" : "#5B6472",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search + controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by store name, division, or district…"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm text-ink shadow-sm outline-none transition-colors focus:border-teal-400"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                viewMode === "grid"
                  ? "bg-slate-100 text-ink"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                viewMode === "list"
                  ? "bg-slate-100 text-ink"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <ListIcon className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Showing {visiblePartners.length} of {filtered.length} store
          {filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {visiblePartners.length > 0 ? (
              <motion.div
                key={activeTab + query + viewMode}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-3"
                }
              >
                {visiblePartners.map((partner) =>
                  viewMode === "grid" ? (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      isSelected={selectedPartner?.id === partner.id}
                      onSelect={setSelectedPartner}
                    />
                  ) : (
                    <PartnerListRow
                      key={partner.id}
                      partner={partner}
                      isSelected={selectedPartner?.id === partner.id}
                      onSelect={setSelectedPartner}
                    />
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center"
              >
                <p className="font-display text-lg font-semibold text-ink">
                  No stores found
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Try a different name, division, or district.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lazy-load sentinel + manual fallback */}
          {hasMore && (
            <div
              ref={sentinelRef}
              className="mt-8 flex flex-col items-center gap-3"
            >
              {isLoadingMore && (
                <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
              )}
              <button
                onClick={loadMore}
                className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-teal-300 hover:text-teal-700"
              >
                Load more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>

        {/* Selected store detail */}
        <AnimatePresence>
          {selectedPartner && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
            >
              {(() => {
                const meta =
                  BRANDS.find((b) => b.key === selectedPartner.brand) ||
                  BRANDS[0];
                return (
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                        style={{
                          backgroundColor: `${meta.color}1A`,
                          color: meta.color,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        {selectedPartner.storeType || meta.label}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                        {selectedPartner.name}
                      </h3>
                      <p className="mt-2 flex items-start gap-2 max-w-lg text-sm leading-relaxed text-slate-500">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                        {selectedPartner.address}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                        {[
                          selectedPartner.division,
                          selectedPartner.district,
                          selectedPartner.thana,
                        ]
                          .filter((v) => v && v !== "#N/A")
                          .map((v, i, arr) => (
                            <span key={v} className="flex items-center gap-2">
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
                                {v}
                              </span>
                              {i < arr.length - 1 && (
                                <span className="text-slate-300">/</span>
                              )}
                            </span>
                          ))}
                      </div>

                      {selectedPartner.contract && (
                        <p className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-400">
                          <Hash className="h-3.5 w-3.5" />
                          Contract ref: {selectedPartner.contract}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
