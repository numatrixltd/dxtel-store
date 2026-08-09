"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Signature circuit-trace grid */}
      <div className="pointer-events-none absolute inset-0 bg-trace-grid bg-trace [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <MapPin className="h-3.5 w-3.5" />
              114+ verified locations nationwide
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Genuine electronics,
              <br />
              a partner{" "}
              <span className="relative text-teal-600">
                near you
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-1 left-0 w-full text-amber-400"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 50 2, 150 2, 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-slate-500 sm:text-lg">
              ElectroLink connects you to a nationwide network of authorized
              retail chains and dealer points &mdash; so every purchase comes
              with genuine products, honest pricing, and support you can
              trust.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/partners"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                Find your nearest partner
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-teal-300"
              >
                Explore products
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                  Network status
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500" />
                  Live
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatBlock value="5+" label="Retail chains" accent="teal" />
                <StatBlock value="109+" label="Dealer points" accent="amber" />
                <StatBlock value="20+" label="Districts covered" accent="teal" />
                <StatBlock value="7 days" label="Support a week" accent="amber" />
              </div>

              <svg viewBox="0 0 320 40" className="mt-6 w-full text-teal-500/40">
                <path
                  d="M0 20 L60 20 L80 6 L120 34 L160 20 L200 20 L220 34 L260 6 L320 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="animate-dash"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, label, accent }) {
  const accentClass = accent === "teal" ? "text-teal-600" : "text-amber-600";
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className={`font-display text-2xl font-semibold ${accentClass}`}>{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}
