"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function PartnerCTA() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-20">
      <div className="pointer-events-none absolute inset-0 bg-trace-grid bg-trace opacity-[0.08] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
          <MapPin className="h-6 w-6" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to find your nearest ElectroLink store?
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
          Search stores points by name or area, and get nearest
          directions, contact numbers, and hours in a couple of taps.
        </p>
        <Link
          href="/partners"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-teal-400"
        >
          Open the store locator
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
